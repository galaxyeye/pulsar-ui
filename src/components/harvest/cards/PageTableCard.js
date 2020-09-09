import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody} from "shards-react";
import FlatTable from "../../../lib/components/FlatTable";
import classNames from "classnames";

class PageTableCard extends React.Component {
  render() {
    let { table, tableIndex } = this.props
    let cardClass = classNames(
      "w-100 shadow-none rounded-0",
      tableIndex > 0 ? "my-1" : ""
    )
    return (
      <Card key={tableIndex} className={cardClass}>
        <CardBody className={"message"}>
          <div>
            <i className="no">{tableIndex + 1}.</i>发现 <em>{table.numColumns}</em> 个字段，区域
            <b> {table.tableData.name}</b>
          </div>
          <div className="scroll-x table-container">
            <FlatTable table={table} tableIndex={tableIndex}/>
          </div>
        </CardBody>
      </Card>
    )
  }
}

PageTableCard.propTypes = {
  /**
   * The user details object.
   */
  table: PropTypes.object,
  tableIndex: PropTypes.number
};

PageTableCard.defaultProps = {
  table: {},
  tableIndex: 0
};

export default PageTableCard;
