export type ScrapeResultSetType = {
  portalUrl: string,
  args: string,
  numTables: number,
  tables: TableType[]
}

export type ScrapeResponseType = {
  isDone: boolean,
  statusCode: number,
  status: string,
  id: string,
  result: ScrapeResultSetType,
  ntotalPages: number,
  nsuccessPages: number
}
