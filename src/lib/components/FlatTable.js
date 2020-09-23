import React from "react";
import PropTypes from "prop-types";
import {formatTableCell} from "../utils";

const FlatTable = ({ table, tableIndex }) => (
  <table className="table table-sm table-flat">
    <thead className="bg-light">
    <tr>
      <th key="C0">&nbsp;</th>
      {table.columnsData.map((column, columnIndex) => (
        <th key={columnIndex}>
          {"T" + (tableIndex + 1) + "C" + (columnIndex + 1)}
        </th>))}
    </tr>
    </thead>
    <tbody>
    {table.rows.map((row, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        {row.map((value, li) => (
          <td key={`C${li}`}>{formatTableCell(value)}</td>
        ))}
      </tr>)
    )}
    </tbody>
  </table>
);

FlatTable.propTypes = {
  /**
   * The user details object.
   */
  table: PropTypes.object
};

FlatTable.defaultProps = {
  table: {
    "numColumns": 98,
    "numRows": 20,
    "hyperPath": "#pdd",
    "rows": [],
    "tableData": {},
    "columnData": {}
  }
};

export default FlatTable;
