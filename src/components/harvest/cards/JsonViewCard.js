import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, Container} from "shards-react";
import FlatTable from "../../../lib/components/FlatTable";
import classnames from "classnames";
import ReactJson from "react-json-view";

class JsonViewCard extends React.Component {
  render() {
    let { json } = this.props
    let cardClass = classnames(
      "w-100 shadow-none rounded-0"
    )
    return (
      <Container fluid>
        <Card className={cardClass}>
          <CardBody className={"p-3"}>
            <div className="scroll-x table-container">
              <ReactJson src={json}/>
            </div>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

JsonViewCard.propTypes = {
  /**
   * The user details object.
   */
  json: PropTypes.object,
};

JsonViewCard.defaultProps = {
  json: {},
};

export default JsonViewCard;
