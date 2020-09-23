import React from "react";
import PropTypes from "prop-types";
import {Button, Card, CardBody, Container, FormGroup} from "shards-react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import {defaultCardBodyClassName, defaultCardClassName} from "./common";

class XSQLCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.editor = null
    this.timer = null
  }

  componentDidMount() {
    let card = this
    this.timer = setInterval(function() {
      if (card.editor != null) {
        card.editor.refresh();
        if (document.querySelector(".harvest-status__x-sql").textContent.indexOf("select") > 0) {
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
            <Button theme="white" type="submit">
              执行
            </Button>
          </CardBody>
        </Card>
      </Container>)
  }
}

XSQLCard.propTypes = {
  /**
   * The url of the sample page.
   */
  url: PropTypes.string
};

XSQLCard.defaultProps = {
  url: ""
};

export default XSQLCard;
