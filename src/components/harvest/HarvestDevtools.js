import React from "react";
import PropTypes from "prop-types";
import {Col, Container, Row} from "shards-react";

import "../../assets/css/harvest.css";

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/theme/idea.css';

import 'codemirror/mode/sql/sql';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/fullscreen';
import classNames from "classnames";
import FullPageCard from "./cards/FullPageCard";
import PageTableCard from "./cards/PageTableCard";
import SnapshotCard from "./cards/SnapshotCard";
import XSQLCard from "./cards/XSQLCard";
import CSSCard from "./cards/CSSCard";

class HarvestDevtools extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullPageCardCollapse: true
    };

    this.toggleFullPageCardCollapse = this.toggleFullPageCardCollapse.bind(this);
  }

  toggleFullPageCardCollapse() {
    this.setState({fullPageCardCollapse: !this.state.fullPageCardCollapse})
  }

  render() {
    const leftColClasses = classNames(
      "py-1 px-0 m-0",
      this.state.fullPageCardCollapse ? "col-2" : "col-6"
    );
    const rightColClasses = classNames(
      "px-0 m-0 control-panel",
      this.state.fullPageCardCollapse ? "col-10" : "col-6"
    );

    return (
      <Container className={"tables"} fluid>
        <Row>
          <Col className={leftColClasses} id="pageViewContainer">
            <FullPageCard
              url={this.props.portalUrl}
              collapse={this.state.fullPageCardCollapse}
              toggleCollapse={this.toggleFullPageCardCollapse}
            />
          </Col>
          <Col className={rightColClasses}>
            {this.props.tables.map((table, tableIndex) => (
              <Row key={tableIndex}>
                <PageTableCard table={table} tableIndex={tableIndex}/>
                <SnapshotCard table={table} tableIndex={tableIndex} />
                <XSQLCard table={table} tableIndex={tableIndex} />
                <CSSCard table={table} tableIndex={tableIndex} />
              </Row>))}
          </Col>
        </Row>
      </Container>
    );
  }
}

HarvestDevtools.propTypes = {
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

HarvestDevtools.defaultProps = {
  "portalUrl": "https://www.amazon.com/Best-Sellers-Automotive/zgbs/automotive/ref=zg_bs_nav_0",
  "args": "-cellType PLAIN_TEXT -verboseJson -diagnose -expires PT8760H -outlinkSelector a[href~=/dp/] -itemExpires PT8760H",
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

export default HarvestDevtools;
