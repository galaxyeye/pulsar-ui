/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardBody, ListGroup, ListGroupItem} from "shards-react";
import * as jquery from "jquery";

const stripStyles = function () {
  jquery("#pulsarHtmlWrapper *").each(function (i, item) {

  });
};

const TopbarActions = ({ title }) => {
  return (
    <div id={"systemPanel"} className={"sticky-top"}>
      <Card small className="mb-3">
        <CardBody className="p-0">
          <ListGroup flush>
            <ListGroupItem className="p-3">
          <span className="d-flex mb-2">
            <i className="material-icons mr-1">flag</i>
            <strong
              className="mr-1">Text:</strong> Awesome valuable element{" "}
            <a className="ml-auto" href="#">
              Edit
            </a>
          </span>
              <span className="d-flex mb-2">
            <i className="material-icons mr-1">visibility</i>
            <strong className="mr-1">Path:</strong><code>{" "}#awesome-list .awesome-item</code>
            <strong className="text-success">Public</strong>{" "}
                <a className="ml-auto" href="#">
              Edit
            </a>
          </span>
              <span className="d-flex">
            <i className="material-icons mr-1">score</i>
            <strong className="mr-1">SQL:</strong><code>select {" "} from load_and_select({" "}, {" "})</code>
            <strong className="text-warning">Ok</strong>
          </span>
            </ListGroupItem>
            <ListGroupItem className="control d-flex px-3 border-0">
              <Button outline theme="accent" size="sm" className={"ml-auto"}>
                <i className="material-icons">save</i> Save Draft
              </Button>
              <Button
                theme="accent" size="sm"
                className="ml-auto"
                onClick={stripStyles}
              >
                <i className="material-icons">file_copy</i> Publish
              </Button>
            </ListGroupItem>
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

TopbarActions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

TopbarActions.defaultProps = {
  title: "Actions"
};

export default TopbarActions;
