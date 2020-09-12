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
   * The status code.
   */
  statusCode: PropTypes.number,
  /**
   * The total page to fetch.
   */
  nTotalPages: PropTypes.number,
  /**
   * The number of pages successfully to fetch.
   */
  nSuccessPages: PropTypes.number,
  /**
   * The number of pages failed to fetch.
   */
  nFailedPages: PropTypes.number,
  /**
   * The uuid of this task.
   */
  uuid: PropTypes.string,
  /**
   * The result.
   */
  result: PropTypes.object
};

HarvestStatus.defaultProps = {
  statusCode: 404,
  uuid: "no-uuid",
  nTotalPages: 0,
  nSuccessPages: 0,
  nFailedPages: 0,
  result: {}
};

export default HarvestStatus;
