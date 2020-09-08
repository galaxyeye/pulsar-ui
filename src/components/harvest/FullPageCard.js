import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardFooter, Collapse, Row} from "shards-react";
import Iframe from "react-iframe";

const FullPageCard = ({ url, fullPageCardCollapse, toggleFullPageCardCollapse }) => (
  <Card className={"m-0 shadow-none rounded-0 position-fixed w-50"}>
    <Collapse open={!fullPageCardCollapse}>
      {
        fullPageCardCollapse ? (<Row/>) :
          (<CardBody className={"p-2 overflow-auto"}>
            <Iframe
              url={"https://material.io/resources/icons/?icon=build&style=baseline"}
              id={"pageViewFrame"}
              width={"1920"}
              height={window.innerHeight - 200}
              loading={"lazy"}
              scrolling={"yes"}
            />
          </CardBody>)
      }
    </Collapse>
    <CardFooter onClick={toggleFullPageCardCollapse}>
      样例网页
    </CardFooter>
  </Card>
);

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
