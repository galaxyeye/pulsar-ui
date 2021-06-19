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
import ScrapeMain from "../ScrapeMain";

class XSQLCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sql: this.props.table.tableData.xsql,
    };
    this.editor = null
    this.timer = null
  }

  componentDidMount() {
    let card = this
    this.timer = setInterval(function () {
      if (card.editor != null) {
        card.editor.refresh();
        let sql = card.editor.sql
        if (sql && sql.indexOf("select") > 0) {
          card.setState({...card.state, sql: sql})
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
                  console.log("mount")
                  card.editor = editor
                }}
                onBlur={(editor, data, value) => {
                }}
                onChange={(editor, data, value) => {
                }}
              />
            </FormGroup>
          </CardBody>
        </Card>
        <Card className={defaultCardClassName()}>
          <ScrapeMain sqlCard={card} />
        </Card>
      </Container>)
  }
}

XSQLCard.propTypes = {
  /**
   * The url of the sample page.
   */
  sql: PropTypes.string
};

XSQLCard.defaultProps = {
  sql: ""
};

export default XSQLCard;
