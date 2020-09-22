import type {TableType} from "./HarvestTaskStatusType";

export function findSampleUrlFromTable(table: TableType, rowIndex: number) {
  if (table.rows.length === 0) return null
  let row = table.rows[rowIndex]
  return row.find(value => value != null && value.indexOf("http") === 0)
}
