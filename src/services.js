/* @flow */

import exports from "exports-loader"
import {DELETE, GET, POST, PUT} from "./lib/api";

export const HotLinkApi = {
  get: GET("/api/x/links/hot")
};

export const W3DocApi = {
  get: GET("/api/w3doc"),
  query: POST("/api/w3doc/query")
};

export const ScrapeApi = {
  query: POST("/api/x/a/q"),
  status: GET("/api/x/a/status")
};

export const HarvestApi = {
  list: GET("/api/xx"),
  create: POST("/api/xx"),
  get: GET("/api/xx/a/status"),
  update: PUT("/api/xx/:id"),
  delete: DELETE("/api/xx/:harvestId"),
  query: POST("/api/xx/a/q")
};

global.services = exports;
