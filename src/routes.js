import React from "react";
import {Redirect} from "react-router-dom";
// Layout Types
import {DefaultLayout} from "./layouts";
// Route Views
import Errors from "./views/Errors";
import HarvestHome from "./views/HarvestHome";
import HarvestLayout from "./layouts/Harvest";
import HarvestTest from "./views/HarvestTest";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/ai" />
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
    layout: DefaultLayout,
    component: Errors
  },
];
