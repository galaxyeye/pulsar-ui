import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardHeader, Collapse} from "shards-react";
import HtmlContent from "../../analyse-page/HtmlContent";

class SnapshotCard extends React.Component {

  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapse: true
    };
  }

  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  }

  render() {
    return (
      <Card className="my-1 shadow-none rounded-0">
        <CardHeader onClick={this.toggleCollapse}>
          原页面局部
        </CardHeader>
        <Collapse open={!this.state.collapse}>
          <CardBody>
            <HtmlContent />
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}

SnapshotCard.propTypes = {
  /**
   * The url of the sample page.
   */
  url: PropTypes.string
};

SnapshotCard.defaultProps = {
  url: ""
};

export default SnapshotCard;
