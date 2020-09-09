/* @flow */

import exports from "exports-loader"
import {DELETE, GET, POST, PUT} from "./lib/api";

export const W3DocApi = {
  get: GET("/api/w3doc"),
  query: POST("/api/w3doc/query")
};

export const HarvestApi = {
  list: GET("/api/xx"),
  create: POST("/api/xx"),
  get: GET("/api/xx/a/status"),
  update: PUT("/api/xx/:id"),
  delete: DELETE("/api/xx/:harvestId"),
  query: POST("/api/xx/a/q")
};

export const CardApi = {
  list: GET("/api/card", (cards, { data }) =>
    // HACK: support for the "q" query param until backend implements it
    cards.filter(
      card =>
        !data.q || card.name.toLowerCase().indexOf(data.q.toLowerCase()) >= 0,
    ),
  ),
  create: POST("/api/card"),
  get: GET("/api/card/:cardId"),
  update: PUT("/api/card/:id"),
  delete: DELETE("/api/card/:cardId"),
  query: POST("/api/card/:cardId/query"),
  // isfavorite:                  GET("/api/card/:cardId/favorite"),
  favorite: POST("/api/card/:cardId/favorite"),
  unfavorite: DELETE("/api/card/:cardId/favorite"),

  listPublic: GET("/api/card/public"),
  listEmbeddable: GET("/api/card/embeddable"),
  createPublicLink: POST("/api/card/:id/public_link"),
  deletePublicLink: DELETE("/api/card/:id/public_link"),
  // related
  related: GET("/api/card/:cardId/related"),
  adHocRelated: POST("/api/card/related"),
};

export const DashboardApi = {
  list: GET("/api/dashboard"),
  // creates a new empty dashboard
  create: POST("/api/dashboard"),
  // saves a complete transient dashboard
  save: POST("/api/dashboard/save"),
  get: GET("/api/dashboard/:dashId"),
  update: PUT("/api/dashboard/:id"),
  delete: DELETE("/api/dashboard/:dashId"),
  addcard: POST("/api/dashboard/:dashId/cards"),
  removecard: DELETE("/api/dashboard/:dashId/cards"),
  reposition_cards: PUT("/api/dashboard/:dashId/cards"),
  favorite: POST("/api/dashboard/:dashId/favorite"),
  unfavorite: DELETE("/api/dashboard/:dashId/favorite"),

  listPublic: GET("/api/dashboard/public"),
  listEmbeddable: GET("/api/dashboard/embeddable"),
  createPublicLink: POST("/api/dashboard/:id/public_link"),
  deletePublicLink: DELETE("/api/dashboard/:id/public_link"),
};

global.services = exports;
