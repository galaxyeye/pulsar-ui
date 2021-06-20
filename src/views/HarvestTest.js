import React from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "shards-react";
import JsonViewCard from "../components/harvest/cards/JsonViewCard";
import ScrapePanel from "../components/harvest/ScrapePanel";

let sql = " select\n" +
  "      dom_base_uri(dom) as url,\n" +
  "      dom_first_text(dom, '#productTitle') as title,\n" +
  "      str_substring_after(dom_first_href(dom, '#wayfinding-breadcrumbs_container ul li:last-child a'), '&node=') as category,\n" +
  "      dom_first_slim_html(dom, '#bylineInfo') as brand,\n" +
  "      cast(dom_all_slim_htmls(dom, '#imageBlock img') as varchar) as gallery,\n" +
  "      dom_first_slim_html(dom, '#landingImage, #imgTagWrapperId img, #imageBlock img:expr(width > 400)') as img,\n" +
  "      dom_first_text(dom, '#price tr td:contains(List Price) ~ td') as listprice,\n" +
  "      dom_first_text(dom, '#price tr td:matches(^Price) ~ td') as price,\n" +
  "      str_first_float(dom_first_text(dom, '#reviewsMedley .AverageCustomerReviews span:contains(out of)'), 0.0) as score\n" +
  "  from load_and_select('https://www.amazon.com/dp/B07XJ8C8F7', 'body');"

class HarvestTest extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  componentDidMount() {
    // this.submitTask(this.state.portalUrl, this.state.args)
  }

  componentWillUnmount() {
    // this.clearRequestInterval()
  }

  render() {
    return (
      <div>
        <ScrapePanel sql={sql}/>
        <Button id="popover-1" onClick={this.toggle}>
          Toggle
        </Button>
        <Popover
          placement="bottom"
          open={this.state.open}
          toggle={this.toggle}
          target="#popover-1"
        >
          <PopoverHeader>Title here</PopoverHeader>
          <PopoverBody>
            <JsonViewCard json={{a: 1, b: 2}}/>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default HarvestTest;
