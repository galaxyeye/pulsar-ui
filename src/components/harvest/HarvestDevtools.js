import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  Container,
  FormGroup,
  Row
} from "shards-react";

import "../../assets/css/harvest.css";

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/theme/idea.css';
import {UnControlled as CodeMirror} from 'react-codemirror2'

import 'codemirror/mode/sql/sql';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/fullscreen';
import FlatTable from "./FlatTable";
import HtmlContent from "../analyse-page/HtmlContent";
import Iframe from "react-iframe";
import classNames from "classnames";
import FullPageCard from "./FullPageCard";

class HarvestDevtools extends React.Component {
  constructor(props) {
    super(props);

    this.toggleFullPageCardCollapse = this.toggleFullPageCardCollapse.bind(this);
    this.toggleSnapshotCardCollapse = this.toggleSnapshotCardCollapse.bind(this);
    this.toggleXsqlCardCollapse = this.toggleXsqlCardCollapse.bind(this);
    this.toggleCssCardCollapse = this.toggleCssCardCollapse.bind(this);
    this.state = {
      fullPageCardCollapse: true,
      snapshotCardCollapse: true,
      xsqlCardCollapse: true,
      cssCardCollapse: true,
    };
    this.editors = []
  }

  toggleFullPageCardCollapse() {
    this.setState({fullPageCardCollapse: !this.state.fullPageCardCollapse});
  }

  toggleSnapshotCardCollapse() {
    this.setState({snapshotCardCollapse: !this.state.snapshotCardCollapse});
  }

  toggleXsqlCardCollapse() {
    let editors = this.editors

    if (!this.state.xsqlCardCollapse) {
      this.editors = []
    } else {
      console.log("setTimeout " + editors.length)
      if (editors.length > 1) {
        setTimeout(function() {
          editors.forEach(editor => {
            editor.refresh();
          })
        }, 1);
      }
    }

    this.setState({xsqlCardCollapse: !this.state.xsqlCardCollapse});
  }

  toggleCssCardCollapse() {
    this.setState({cssCardCollapse: !this.state.cssCardCollapse});
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
              url={"http://platonic.fun/s/pages/amazon-com-397256be1ed3b32e198d40c54d82472a.htm"}
              fullPageCardCollapse={this.state.fullPageCardCollapse}
              toggleFullPageCardCollapse={this.toggleFullPageCardCollapse}
            />
          </Col>
          <Col className={rightColClasses}>

            {this.props.tables.map((table, tableIndex) => (
              <Row key={tableIndex}>
                {renderPageTable(table, tableIndex)}

                {renderSnapshotCard(table, tableIndex, this)}

                {renderXSQLCard(table, tableIndex, this)}

                {renderCSSCard(table, tableIndex, this)}

              </Row>))}

          </Col>
        </Row>
      </Container>
    );

    function createColumnName(tableIndex, columnIndex) {
      return "T" + (tableIndex + 1) + "C" + (columnIndex + 1)
    }

    function renderPageTable(table, tableIndex) {
      return (
        <Card className={"my-1 w-100 shadow-none rounded-0"}>
          <CardBody className={"message"}>
            <div>
              <i className="no">{tableIndex + 1}.</i>
              e<b>X</b>tracted <em>{table.numColumns}</em> fields from area
              <b> {table.tableData.name}</b>
            </div>
            <div className="scroll-x table-container">
              <FlatTable table={table} tableIndex={tableIndex}/>
            </div>
          </CardBody>
        </Card>
      )
    }

    function renderSnapshotCard(table, tableIndex, devtools) {
      return (
        <Card className="my-1 shadow-none rounded-0">
          <CardHeader onClick={devtools.toggleSnapshotCardCollapse}>
            原页面局部
          </CardHeader>
          <Collapse open={!devtools.state.snapshotCardCollapse}>
            <CardBody>
              <HtmlContent/>
            </CardBody>
          </Collapse>
        </Card>
      )
    }

    function renderXSQLCard(table, tableIndex, devtools) {
      return (
        <Card className={"my-1 shadow-none rounded-0 collapse show"}>
          <CardHeader onClick={devtools.toggleXsqlCardCollapse}>
            AI 生成 X-SQL
          </CardHeader>

          <Collapse open={!devtools.state.xsqlCardCollapse}>
            <CardBody className="harvest-status__x-sql">
              <FormGroup>
                <CodeMirror
                  value={table.tableData.xsql}
                  options={{
                    mode: 'sql',
                    theme: 'idea',
                    lineNumbers: true,
                    fullScreen: false,
                  }}
                  editorDidMount={(editor) => {
                    console.log("editorDidMount")
                    devtools.editors.push(editor)
                  }}
                  onBlur={(editor, data, value) => {
                  }}
                  onChange={(editor, data, value) => {
                  }}
                />
                {/*<FormTextarea value={table.tableData.xsql} rows={table.tableData.xsql.split("\n").length} />*/}
              </FormGroup>
              <FormGroup>
                <ButtonGroup>
                  <Button theme="white" type="submit">
                    执行
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </CardBody>
          </Collapse>
        </Card>
      )
    }

    function renderCSSCard(table, tableIndex, devtools) {
      return (
        <Card className={"my-1 shadow-none rounded-0 collapse show"}>
          <CardHeader onClick={devtools.toggleCssCardCollapse}>AI 生成的 CSS 路径</CardHeader>
          <Collapse open={!devtools.state.cssCardCollapse}>
            <CardBody>
              <div className="harvest-status__x-sql">
                <table className="table table-light table-sm">
                  <thead>
                  <tr>
                    {[" ", "字段名", "AI 生成的超路径", "样本路径1", "样本路径2", "样本值"].map((name, i) => (
                      <th key={i}>{name}</th>
                    ))}
                  </tr>
                  </thead>
                  <tbody>
                  {table.columnsData.filter(column => column.cname.length > 0).map((column, columnIndex) => (
                    <tr key={columnIndex}>
                      {[columnIndex + 1, createColumnName(tableIndex, columnIndex),
                        column.hyperPath, column.path1, column.path2, table.rows[0][columnIndex]].map((td, i) => (
                        <td key={i}>{td}</td>
                      ))}
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Collapse>
        </Card>
      )
    }

    function renderFullPageCard(devtools) {
      return (
        <Card className={"m-0 shadow-none rounded-0 position-fixed w-50"}>
          <Collapse open={!devtools.state.fullPageCardCollapse}>
            {
              devtools.state.fullPageCardCollapse ? (<div/>) :
                (<CardBody className={"p-2 overflow-auto"}>
                    <Iframe
                      url={"http://platonic.fun/s/pages/amazon-com-397256be1ed3b32e198d40c54d82472a.htm"}
                      id={"pageViewFrame"}
                      width={"1920"}
                      height={window.innerHeight - 200}
                      loading={"lazy"}
                      scrolling={"yes"}
                    />
                  </CardBody>)
            }
          </Collapse>
          <CardFooter onClick={devtools.toggleFullPageCardCollapse}>
            原网页
          </CardFooter>
        </Card>
      )
    }
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
