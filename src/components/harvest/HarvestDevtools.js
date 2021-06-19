import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  Col,
  Collapse,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from "shards-react";

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
import ColumnInfoCard from "./cards/ColumnInfoCard";

class HarvestDevtools extends React.Component {
  constructor(props) {
    super(props);

    this.panelGroup = {
      xsqlPanel: {},
      cssPanel: {},
      fragmentPanel: {},
      browserPanel: {}
    }

    this.state = {
      fullPageCardCollapse: true,
      tableIndex: 0,
      tablePanel: {
        active: true
      },
      activePanel: this.panelGroup.xsqlPanel
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.toggleTablePanel = this.toggleTablePanel.bind(this);
    this.onChooseTable = this.onChooseTable.bind(this);
  }

  onChooseTable(tableIndex) {
    let tablePanel = this.state.tablePanel
    tablePanel.active = true
    this.setState({
      ...this.state,
      tableIndex: tableIndex,
      tablePanel: tablePanel
    })
  }

  toggleTablePanel(e: Event) {
    let ele: Element = e.target
    let tablePanel = this.state.tablePanel
    tablePanel.active = !tablePanel.active
    this.setState({...this.state, tablePanel: tablePanel})
  }

  togglePanel(e: Event, panel: Object) {
    this.setState({...this.state, activePanel: panel})
  }

  render() {
    let {tableIndex} = this.state
    let {portalUrl, tables} = this.props
    let table = tables[tableIndex]

    return (
      <Container className={"tables"} fluid>
        <Row>
          <Col className={"col-lg-2 col-sm-12"}>
            <ListGroup>
              <ListGroupItem className={"shadow-none rounded-0 border-0"}>
                网页区域
              </ListGroupItem>
              {tables.map((table, tableIndex) => (
                <ListGroupItem key={tableIndex}
                               onClick={() => this.onChooseTable(tableIndex)}
                               active={this.state.tableIndex === tableIndex}>
                  {table.tableData.name}
                </ListGroupItem>))}
            </ListGroup>
          </Col>

          <Col className={"col-lg-10 vh-100 w-100"}>
            <Collapse open={this.state.tablePanel.active}>
              <Row className={"h-50"}>
                <PageTableCard table={table} tableIndex={tableIndex}/>
              </Row>
            </Collapse>

            <Row>
              <Container fluid>
                <Button outline theme={"primary"} className="mr-2"
                        data-ref={"#tablePanel"}
                        onClick={this.toggleTablePanel}>
                  <i className={"material-icons"}>table</i>
                  表格
                </Button>

                <ButtonGroup>
                  <Button outline
                          onClick={(e) => this.togglePanel(e, this.panelGroup.xsqlPanel)}>
                    <i className={"material-icons"}>code</i>
                    SQL
                  </Button>

                  <Button outline
                          onClick={(e) => this.togglePanel(e, this.panelGroup.cssPanel)}>
                    <i className={"material-icons"}>color_lens</i>
                    列分析
                  </Button>
                  <Button outline
                          onClick={(e) => this.togglePanel(e, this.panelGroup.fragmentPanel)}>
                    <i className={"material-icons"}>preview</i>
                    数据预览
                  </Button>
                  <Button outline
                          onClick={(e) => this.togglePanel(e, this.panelGroup.browserPanel)}>
                    <i className={"material-icons"}>pageview</i>
                    浏览器
                  </Button>
                </ButtonGroup>
              </Container>
            </Row>

            <Row className={"h-50"}>
              <Collapse
                open={this.state.activePanel === this.panelGroup.xsqlPanel}>
                <XSQLCard table={table} tableIndex={tableIndex}/>
              </Collapse>
              <Collapse
                open={this.state.activePanel === this.panelGroup.cssPanel}>
                <ColumnInfoCard table={table} tableIndex={tableIndex}/>
              </Collapse>
              <Collapse
                open={this.state.activePanel === this.panelGroup.fragmentPanel}>
                <FragmentCard targetUrl={portalUrl} table={table}
                              tableIndex={tableIndex} activeRowIndex={0}/>
              </Collapse>

              {this.state.activePanel === this.panelGroup.browserPanel ?
                <BrowserCard url={portalUrl}/> : <div/>}
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
