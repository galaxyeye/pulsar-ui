import React from "react";
import PropTypes from "prop-types";
import {Card, CardBody, Container} from "shards-react";
import FlatTable from "../../../lib/components/FlatTable";
import classnames from "classnames";

class PageTableCard extends React.Component {
  render() {
    let { table, tableIndex, className } = this.props
    let cardClass = classnames(
      "w-100 shadow-none rounded-0"
    )
    return (
      <Container fluid>
        <Card key={tableIndex} className={classnames(className, cardClass)}>
          <CardBody className={"p-3"}>
            <div>
              <i className="no">{tableIndex + 1}.</i>发现 <em>{table.numColumns}</em> 个字段，区域
              <b> {table.tableData.name}</b>，<span>SQL已自动生成</span>
            </div>
            <div className="scroll-x table-container">
              <FlatTable table={table} tableIndex={tableIndex}/>
            </div>
          </CardBody>
        </Card>
      </Container>
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
