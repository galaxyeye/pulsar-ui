import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardHeader, Collapse, FormGroup} from "shards-react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import {defaultCardBodyClassName, defaultCardClassName} from "./common";

class XSQLCard extends React.Component {

  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapse: true
    };
    this.editor = null
    this.timer = null
  }

  toggleCollapse() {
    if (!this.state.collapse) {
      this.editor = null
    } else {
      let card = this
      this.timer = setInterval(function() {
        if (card.editor != null) {
          card.editor.refresh();
          clearInterval(card.timer)
        }
      }, 5);
    }

    this.setState({collapse: !this.state.collapse});
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    let card = this
    return (
      <Card className={defaultCardClassName()}>
        <CardHeader onClick={this.toggleCollapse}>
          AI 生成 X-SQL
        </CardHeader>

        <Collapse open={!this.state.collapse}>
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
                }}
              />
              {/*<FormTextarea value={table.tableData.xsql} rows={table.tableData.xsql.split("\n").length} />*/}
            </FormGroup>
            {/*<FormGroup>*/}
            {/*  <ButtonGroup>*/}
            {/*    <Button theme="white" type="submit">*/}
            {/*      执行*/}
            {/*    </Button>*/}
            {/*  </ButtonGroup>*/}
            {/*</FormGroup>*/}
          </CardBody>
        </Collapse>
      </Card>)
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
