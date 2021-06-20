import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Container,
  FormGroup
} from "shards-react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import {defaultCardBodyClassName, defaultCardClassName} from "./common";
import ScrapePanel from "../ScrapePanel";

class XSQLCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      table: this.props.table,
      tableIndex: this.props.tableIndex
    };
    this.editor = null
    this.scrapePanel = null
    this.timer = null
  }

  componentDidMount() {
    let card = this
    // fix editor bug
    this.timer = setInterval(function () {
      if (card.editor != null) {
        card.editor.refresh();
        let sql = card.editor.value
        if (sql && sql.indexOf("select") > 0) {
          clearInterval(card.timer)
        }
      }
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    let card = this
    return (
      <Container fluid>
        <Card className={defaultCardClassName()}>
          <CardBody className={defaultCardBodyClassName()}>
            <FormGroup>
              <CodeMirror
                className={"harvest-status__x-sql"}
                value={this.props.table.tableData.xsql}
                options={{
                  mode: 'sql',
                  theme: 'idea',
                  lineNumbers: true,
                  fullScreen: false,
                }}
                editorDidMount={(editor) => {
                  card.editor = editor
                }}
                onBlur={(editor, data, value) => {
                }}
                onChange={(editor, data, value) => {
                  let panel = card.scrapePanel
                  if (panel != null) {
                    panel.setState({...panel.state, sql: value})
                  }
                }}
              />
            </FormGroup>
          </CardBody>
        </Card>
        <Card className={defaultCardClassName()}>
          <ScrapePanel
            sql = {this.props.table.tableData.xsql}
            didMount = {(panel) => {
              this.scrapePanel = panel
              panel.scrape()
            }}
          />
        </Card>
      </Container>)
  }
}

XSQLCard.propTypes = {
  /**
   * The url of the sample page.
   */
  table: PropTypes.object
};

XSQLCard.defaultProps = {
  table: {}
};

export default XSQLCard;
