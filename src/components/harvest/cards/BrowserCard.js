import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, Container} from "shards-react";
import Iframe from "react-iframe";
import {Buffer} from "buffer";
import {Store} from "../../../flux";
import * as classnames from "classnames";
import {defaultCardClassName} from "./common";

class BrowserCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
  }

  render() {
    let { url, className } = this.props
    let iframe = document.querySelector("iframe")
    return (
      <Container fluid>
        <Card className={classnames(className, defaultCardClassName())}>
          <CardBody className={"p-2 overflow-auto"}>
            <Iframe
              url={getW3DocApi(url)}
              id={"pageViewFrame"}
              width={"1920"}
              height={window.innerHeight - 200}
              loading={"lazy"}
              scrolling={"yes"}
            />
          </CardBody>
        </Card>
      </Container>)
  }
}

function getW3DocApi(targetUrl) {
  let auth = Store.getAuth()
  let api = Store.getApiHost() + "/api/w3doc?"
    + "url=" + Buffer.from(targetUrl).toString('base64')
    + "&proxyLinks=true"
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
