import React from "react";
import PropTypes from "prop-types";
import {Col, Container, ListGroup, ListGroupItem, Row} from "shards-react";

import "../../assets/css/harvest.css";

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/theme/idea.css';

import 'codemirror/mode/sql/sql';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/fullscreen';
import BrowserCard from "./cards/BrowserCard";
import PageTableCard from "./cards/PageTableCard";
import FragmentCard from "./cards/FragmentCard";
import XSQLCard from "./cards/XSQLCard";
import CSSCard from "./cards/CSSCard";

class HarvestDevtools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullPageCardCollapse: true,
      tableIndex: 0
    };

    this.toggleFullPageCardCollapse = this.toggleFullPageCardCollapse.bind(this);
    this.onChooseTable = this.onChooseTable.bind(this);
  }

  toggleFullPageCardCollapse() {
    this.setState({...this.state, fullPageCardCollapse: !this.state.fullPageCardCollapse})
  }

  onChooseTable(tableIndex) {
    this.setState({...this.state, tableIndex: tableIndex})
  }

  render() {
    let {tableIndex} = this.state
    let {portalUrl, tables} = this.props
    let table = tables[tableIndex]

    return (
      <Container className={"tables"} fluid>
        <Row>
          <Col className={"px-0 m-0 col-2"}>
            <ListGroup>
              <ListGroupItem className={"shadow-none rounded-0 border-0"}>网页区域</ListGroupItem>
              {tables.map((table, tableIndex) => (
                <ListGroupItem key={tableIndex} onClick={() => this.onChooseTable(tableIndex)} active={this.state.tableIndex === tableIndex}>
                  {table.tableData.name}
                </ListGroupItem>))}
            </ListGroup>
          </Col>
          <Col className={"px-0 m-0 col-10 vh-100 w-100"}>
            <PageTableCard className={"h-50"} table={table} tableIndex={tableIndex}/>
            <Row className={"h-50 my-3 bg-white"}>
              <XSQLCard table={table} tableIndex={tableIndex} />
              <CSSCard table={table} tableIndex={tableIndex} />
              <FragmentCard targetUrl={portalUrl} table={table} tableIndex={tableIndex} />
              <BrowserCard url={portalUrl} captionPosition={"top"}
                collapse={this.state.fullPageCardCollapse}
                toggleCollapse={this.toggleFullPageCardCollapse}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

HarvestDevtools.propTypes = {
  /**
   * The portalUrl.
   */
  portalUrl: PropTypes.string,
  /**
   * The portalUrl .
   */
  args: PropTypes.string,
  /**
   * The tables dataset.
   */
  tables: PropTypes.array
};

HarvestDevtools.defaultProps = {
  "portalUrl": "",
  "args": "",
  "numTables": 0,
  tables: []
};

export default HarvestDevtools;
