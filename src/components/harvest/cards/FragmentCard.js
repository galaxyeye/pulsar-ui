import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardHeader, Collapse} from "shards-react";
import HtmlContent from "../../analyse-page/HtmlContent";
import {Store} from "../../../flux";
import {Buffer} from "buffer";
import {W3DocApi} from "../../../services";
import {findSampleUrlFromTable} from "../../../lib/HarvestTaskStatus";
import {defaultCardBodyClassName, defaultCardClassName} from "./common";
const base64url = require('base64-url')

class FragmentCard extends React.Component {

  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapse: true,
      sampleUrl: null,
      w3doc: null
    };
  }

  toggleCollapse() {
    if (!this.state.collapse) {
      this.editor = null
    } else {
      let sampleUrl = findSampleUrlFromTable(this.props.table)
      if (this.state.sampleUrl !== sampleUrl) {
        W3DocApi.get({
          url: base64url.encode(sampleUrl),
          noStyle: true,
          noImg: true,
          noMedia: true,
          noCustomAttributes: true,
          fragmentCss: this.props.table.tableData.hyperPath,
          authToken: Store.getAuth().userToken
        }).then((w3doc) => {
          this.setState({...this.state, sampleUrl: sampleUrl, w3doc: w3doc})
        }).catch(function (ex) {
          console.log('Response parsing failed. Error: ', ex);
        });
      }
    }

    this.setState({...this.state, collapse: !this.state.collapse});
  }

  render() {
    return (
      <Card className={defaultCardClassName()}>
        <CardHeader onClick={this.toggleCollapse}>
          页面局部
        </CardHeader>
        <Collapse open={!this.state.collapse}>
          <CardBody className={defaultCardBodyClassName()}>
            <HtmlContent html={this.state.w3doc} />
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}

FragmentCard.propTypes = {
  /**
   * The url of the sample page.
   */
  table: PropTypes.object
};

FragmentCard.defaultProps = {
  url: ""
};

export default FragmentCard;
