import React from "react";
import PropTypes from "prop-types";
import {Col, Container, Row} from "shards-react";

import BrowserCard from "./cards/BrowserCard";
import PageTableCard from "./cards/PageTableCard";
import classNames from "classnames";

class HarvestResult extends React.Component {

  constructor(props) {
    super(props);
    this.toggleFullPageCardCollapse = this.toggleFullPageCardCollapse.bind(this);
    this.state = {
      fullPageCardCollapse: true
    };
  }

  toggleFullPageCardCollapse() {
    this.setState({fullPageCardCollapse: !this.state.fullPageCardCollapse});
  }

  render() {
    const leftColClasses = classNames(
      "px-0 m-0",
      this.state.fullPageCardCollapse ? "col-10" : "col-6"
    );
    const rightColClasses = classNames(
      "px-0 m-0 bg-white",
      this.state.fullPageCardCollapse ? "col-2" : "col-6"
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
            <BrowserCard
              url={portalUrl}
              captionPosition={"bottom"}
              collapse={this.state.fullPageCardCollapse}
              toggleCollapse={this.toggleFullPageCardCollapse}
            />
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
