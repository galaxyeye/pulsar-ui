export type Row = string[]

export type TableData = {
  isCombined: boolean,
  hyperPath: string,
  xsql: string,
  alignedTop: number,
  name: string,
  documentSize: number,
  score: string,
  numClusters: number,
  numQualifiedClusters: number,
  titleSuffix: string,
  distortion: number,
  dataTypeStatistics: {},
  clusterTaskStatus: {},
  clusterGroupMetrics: {},
  microP: number,
  microR: number,
  microF1: number,
  macroP: number,
  macroR: number,
  macroF1: number,
  ff: number,
  ffr: number
}

export type Table = {
  tableData: TableData,
  rows: Row[]
}

export type HarvestResult = {
  portalUrl: string,
  args: string,
  numTables: number,
  tables: Table[]
}

export type HarvestTaskStatus = {
  statusCode: number,
  status: string,
  uuid: string,
  result: HarvestResult
}

export function findSampleUrlFromTable(table: Table) {
  if (table.rows.length === 0) return null
  let row = table.rows[0]
  return row.find(value => value != null && value.indexOf("http") === 0)
}
