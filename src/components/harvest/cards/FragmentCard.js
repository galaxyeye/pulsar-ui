import React from "react";
import PropTypes from "prop-types";
import HtmlContent from "../HtmlContent";
import {Store} from "../../../flux";
import {W3DocApi} from "../../../services";
import {findSampleUrlFromTable} from "../../../lib/utils";

const base64url = require('base64-url')

class FragmentCard extends React.Component {

  constructor(props) {
    super(props);
    this.fetchDocument = this.fetchDocument.bind(this);
    this.state = {
      sampleUrl: null,
      cssPath: null,
      w3doc: null
    };
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    let sampleUrl = findSampleUrlFromTable(this.props.table, this.props.activeRowIndex)
    let cssPath = this.props.table.tableData.hyperPath

    if (this.state.sampleUrl !== sampleUrl || this.state.cssPath !== cssPath) {
      this.fetchDocument()
    }
  }

  fetchDocument() {
    let sampleUrl = findSampleUrlFromTable(this.props.table, this.props.rowIndex)
    let cssPath = this.props.table.tableData.hyperPath

    W3DocApi.get({
      url: base64url.encode(sampleUrl),
      noStyle: true,
      noImg: true,
      noMedia: true,
      noCustomAttributes: true,
      fragmentCss: cssPath,
      authToken: Store.getAuth().authToken
    }).then((w3doc) => {
      this.setState({...this.state, sampleUrl: sampleUrl, cssPath: cssPath, w3doc: w3doc})
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex);
    });
  }

  render() {
    return (
      <HtmlContent rowIndex={this.props.rowIndex} html={this.state.w3doc} />
    )
  }
}

FragmentCard.propTypes = {
  /**
   * The url of the sample page.
   */
  table: PropTypes.object,
  rowIndex: PropTypes.number
};

FragmentCard.defaultProps = {
  url: "",
  rowIndex: 0
};

export default FragmentCard;
