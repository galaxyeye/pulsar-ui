import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardHeader, Col, Container, Row} from "shards-react";

class ColumnInfoCard extends React.Component {

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
    let {table, tableIndex} = this.props
    return (
      <Container fluid className="harvest-status__css-path">
        {table.columnsData.filter(column => column.cname.length > 0).map((column, columnIndex) => (
          <Card key={columnIndex} className={"m-1"}>
            <CardHeader><em>{columnIndex + 1}.</em><span>{createColumnName(tableIndex, columnIndex)}</span></CardHeader>
            <CardBody>
              <Row>
                <Col className={"col-2"}>超路径</Col>
                <Col className={"text-primary"}>{column.hyperPath}</Col>
              </Row>
              <Row>
                <Col className={"col-2"}>路径1</Col>
                <Col className={"text-info"}>{column.path1}</Col>
              </Row>
              <Row>
                <Col className={"col-2"}>路径1置信度</Col>
                <Col className={"text-info"}>{column.numPath1}/{table.numRows}</Col>
              </Row>
              <Row>
                <Col className={"col-2"}>路径2</Col>
                <Col className={"text-info"}>{column.path2}</Col>
              </Row>
              <Row>
                <Col className={"col-2"}>路径2置信度</Col>
                <Col className={"text-info"}>{column.numPath2}/{table.numRows}</Col>
              </Row>
              <Row>
                <Col className={"col-2"}>样本值</Col>
                <Col>{table.rows[0][columnIndex]}</Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </Container>)
  }
}

function createColumnName(tableIndex, columnIndex) {
  return "T" + (tableIndex + 1) + "C" + (columnIndex + 1)
}

ColumnInfoCard.propTypes = {
  /**
   * The url of the sample page.
   */
  url: PropTypes.string
};

ColumnInfoCard.defaultProps = {
  url: ""
};

export default ColumnInfoCard;
