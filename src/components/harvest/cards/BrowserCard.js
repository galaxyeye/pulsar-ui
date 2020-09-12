import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Row
} from "shards-react";
import Iframe from "react-iframe";
import {Buffer} from "buffer";
import {Store} from "../../../flux";
import * as classnames from "classnames";
import {defaultCardClassName} from "./common";

class BrowserCard extends React.Component {

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
    let { url, collapse, toggleCollapse, className, captionPosition } = this.props

    return (
      <Card className={classnames(className, defaultCardClassName())}>
        { captionPosition === "top" ? <CardHeader onClick={toggleCollapse}>浏览器</CardHeader> : ""}
        <Collapse open={!collapse}>
          {
            collapse ? (<Row/>) :
              (<CardBody className={"p-2 overflow-auto"}>
                <Iframe
                  url={getW3DocApi(url)}
                  id={"pageViewFrame"}
                  width={"1920"}
                  height={window.innerHeight - 200}
                  loading={"lazy"}
                  scrolling={"yes"}
                />
              </CardBody>)
          }
        </Collapse>
        { captionPosition === "bottom" ? <CardFooter onClick={toggleCollapse}>浏览器</CardFooter> : ""}
      </Card>)
  }
}

function getW3DocApi(targetUrl) {
  let auth = Store.getAuth()
  let api = Store.getApiHost() + "/api/w3doc?"
    + "url=" + Buffer.from(targetUrl).toString('base64')
    + "&authToken=" + auth.userToken
  console.log(api)
  return api
}

BrowserCard.propTypes = {
  /**
   * The url of the sample page.
   */
  url: PropTypes.string
};

BrowserCard.defaultProps = {
  url: ""
};

export default BrowserCard;
