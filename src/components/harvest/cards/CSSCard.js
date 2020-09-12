import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, CardHeader, Collapse} from "shards-react";
import {defaultCardBodyClassName, defaultCardClassName} from "./common";

class CSSCard extends React.Component {

  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      collapse: true
    };
  }

  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  }

  render() {
    let {table, tableIndex} = this.props
    return (
      <Card className={defaultCardClassName()}>
        <CardHeader onClick={this.toggleCollapse}>AI 生成的 CSS 路径</CardHeader>
        <Collapse open={!this.state.collapse}>
          <CardBody className={defaultCardBodyClassName()}>
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
      </Card>)
  }
}

function createColumnName(tableIndex, columnIndex) {
  return "T" + (tableIndex + 1) + "C" + (columnIndex + 1)
}

CSSCard.propTypes = {
  /**
   * The url of the sample page.
   */
  url: PropTypes.string
};

CSSCard.defaultProps = {
  url: ""
};

export default CSSCard;
