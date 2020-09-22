import React from "react";
import PropTypes from "prop-types";
import {Button, ButtonGroup, Col, Collapse, Container, Row} from "shards-react";

import BrowserCard from "./cards/BrowserCard";
import PageTableCard from "./cards/PageTableCard";
import classNames from "classnames";

class HarvestResult extends React.Component {

  constructor(props) {
    super(props);
    this.toggleBrowser = this.toggleBrowser.bind(this);
    this.state = {
      browserActive: false
    };
  }

  toggleBrowser() {
    this.setState({browserActive: !this.state.browserActive});
  }

  render() {
    const leftColClasses = classNames(
      "px-0 m-0",
      this.state.browserActive ? "col-6" : "col-11"
    );
    const rightColClasses = classNames(
      "px-0 m-0 bg-white",
      this.state.browserActive ? "col-6" : "col"
    );

    let {tables, portalUrl} = this.props;
    return (<Container className={"tables"} fluid>
        <Row>
          <Col className={leftColClasses}>
            {tables.map((table, tableIndex) => (
              <PageTableCard key={tableIndex} table={table} tableIndex={tableIndex}/>
            ))}
          </Col>
          <Col className={rightColClasses}>
            <Collapse open={this.state.browserActive}>
              <BrowserCard url={portalUrl} />
            </Collapse>
            <Button outline onClick={this.toggleBrowser}>
              <i className={"material-icons"}>pageview</i>
              浏览器
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

HarvestResult.propTypes = {
  /**
   * The portalUrl .
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

HarvestResult.defaultProps = {
  "portalUrl": "https://www.amazon.com/Best-Sellers-Automotive/zgbs/automotive/ref=zg_bs_nav_0",
  "args": "",
  "numTables": 9,
  tables: [
    {
      "numColumns": 98,
      "numRows": 20,
      "hyperPath": "",
      rows: [],
      "tableData": {},
      "columnsData": []
    }
  ]
};

export default HarvestResult;
