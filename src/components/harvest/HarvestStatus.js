import React from "react";
import PropTypes from "prop-types";
import HarvestResult from "./HarvestResult";
import {Container} from "shards-react";

const HarvestStatus = ({ uuid, statusCode, result }) => (
  <Container fluid className={"mx-0"}>
    <HarvestResult portalUrl={result.portalUrl} args={result.args} tables={result.tables} />
  </Container>
);

HarvestStatus.propTypes = {
  /**
   * The portalUrl .
   */
  statusCode: PropTypes.number,
  /**
   * The portalUrl .
   */
  uuid: PropTypes.string,
  /**
   * The result.
   */
  result: PropTypes.object
};

HarvestStatus.defaultProps = {
  "statusCode": 404,
  "uuid": "no-uuid",
  "result": {}
};

export default HarvestStatus;
