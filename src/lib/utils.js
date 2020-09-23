import type {TableType} from "./HarvestTaskStatusType";
import React from "react";

export const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function formatPercentage(num) {
  return Number(num / 100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1})
}

export function findSampleUrlFromTable(table: TableType, rowIndex: number) {
  if (table.rows.length === 0) return null
  let row = table.rows[rowIndex]
  return row.find(value => isUrl(value))
}

export function isUrl(s: string) {
  return s && s.match(URL_REGEX)
}

export function formatTableCell(s: string) {
  if (isUrl(s)) {
    return <a href={s} target={"_blank"}>{s}</a>
  } else return s
}
