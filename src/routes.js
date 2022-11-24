import React from "react";
import {Redirect} from "react-router-dom";
// Route Views
import Errors from "./views/Errors";
import HarvestHome from "./views/HarvestHome";
import HarvestLayout from "./layouts/Harvest";
import HarvestTest from "./views/HarvestTest";
import {DefaultLayout} from "./layouts";

export default [
  {
    path: "/",
    exact: true,
    layout: HarvestLayout,
    component: () => <Redirect to="/ai"/>
  },
  {
    path: "/ai",
    layout: HarvestLayout,
    component: HarvestHome
  },
  {
    path: "/test",
    layout: HarvestLayout,
    component: HarvestTest
  },
  {
    path: "/errors",
    layout: HarvestLayout,
    component: Errors
  },
];
