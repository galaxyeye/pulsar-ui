import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardFooter, Collapse, Row} from "shards-react";
import Iframe from "react-iframe";
import {Buffer} from "buffer";
import {Store} from "../../../flux";

const FullPageCard = ({ url, collapse, toggleCollapse }) => (
  <Card className={"m-0 shadow-none rounded-0 position-fixed w-50"}>
    <Collapse open={!collapse}>
      {
        collapse ? (<Row/>) :
          (<CardBody className={"p-2 overflow-auto"}>
            <Iframe
              url={getW3DocQueryApi(url)}
              id={"pageViewFrame"}
              width={"1920"}
              height={window.innerHeight - 200}
              loading={"lazy"}
              scrolling={"yes"}
            />
          </CardBody>)
      }
    </Collapse>
    <CardFooter onClick={toggleCollapse}>
      样例网页
    </CardFooter>
  </Card>
);

function getW3DocQueryApi(targetUrl) {
  let auth = Store.getAuth()
  let api = Store.getApiHost() + "/api/w3doc?"
    + "url=" + Buffer.from(targetUrl).toString('base64')
    + "&authToken=" + auth.userToken
  console.log(api)
  return api
}

FullPageCard.propTypes = {
  /**
   * The url of the sample page.
   */
  url: PropTypes.string
};

FullPageCard.defaultProps = {
  url: ""
};

export default FullPageCard;
