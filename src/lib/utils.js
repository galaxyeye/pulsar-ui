import type {TableType} from "./HarvestTaskStatusType";
import React from "react";

/**
 * TODO: can not recognize unicode in url
 * */
export const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

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

/**
 * @param s The possible url and args string
 * @return object|null
 * */
export function splitUrlAndArgs(s: string) {
  s = s.trim()
  if (!s) return {url: null, args: null}

  let pos = s.indexOf(" ")
  let url = pos > "http://".length ? s.substring(0, pos) : s
  if (!isUrl(url)) return {url: null, args: null}
  let args = pos > 0 ? s.substring(1 + pos).trim() : null
  if (args === "null") args = null
  return {url: url, args: args}
}

export function formatTableCell(s: string) {
  if (isUrl(s)) {
    return <a href={s} target={"_blank"}>{s}</a>
  } else return s
}

export function adjustInterval(tick: number, timer: number) {
  if (tick > 180) {
    clearInterval(timer)
    return false
  } else if (tick > 120 && tick % 20 === 0) {
    return false
  } else if (tick > 60 && tick % 10 === 0) {
    return false
  } else if (tick > 30 && tick % 5 === 0) {
    return false
  } else if (tick > 20 && tick % 3 === 0) {
    return false
  } else if (tick % 2 === 0) {
    return false
  }

  return true
}
