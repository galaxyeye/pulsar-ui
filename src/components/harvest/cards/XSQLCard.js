import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  FormGroup
} from "shards-react";
import HtmlContent from "../../analyse-page/HtmlContent";
import {UnControlled as CodeMirror} from "react-codemirror2";

class XSQLCard extends React.Component {

  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
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
          card.clearTimer()
        }
      }, 5);
    }

    this.setState({collapse: !this.state.collapse});
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer() {
    if (this.timer != null) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  render() {
    let card = this
    return (
      <Card className={"my-1 shadow-none rounded-0 collapse show"}>
        <CardHeader onClick={this.toggleCollapse}>
          AI 生成 X-SQL
        </CardHeader>

        <Collapse open={!this.state.collapse}>
          <CardBody className="harvest-status__x-sql">
            <FormGroup>
              <CodeMirror
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
            <FormGroup>
              <ButtonGroup>
                <Button theme="white" type="submit">
                  执行
                </Button>
              </ButtonGroup>
            </FormGroup>
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
