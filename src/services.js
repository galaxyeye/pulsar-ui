/* @flow */

import exports from "exports-loader"
import {DELETE, GET, POST, PUT} from "./lib/api";

export const HotLinkApi = {
  get: GET("/xx/links/hot")
};

export const W3DocApi = {
  get: GET("/w3doc"),
  query: POST("/w3doc/query")
};

export const ScrapeApi = {
  query: POST("/x/a/q"),
  status: GET("/x/a/status")
};

export const HarvestApi = {
  list: GET("/xx"),
  create: POST("/xx"),
  get: GET("/xx/a/status"),
  update: PUT("/xx/:id"),
  delete: DELETE("/xx/:harvestId"),
  query: POST("/xx/a/q")
};

global.services = exports;
