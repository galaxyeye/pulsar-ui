import React from "react";

import "../assets/css/harvest.css";
import "../assets/css/reset.css";
import {Container} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

const HarvestLayout = ({ children }) => (
  <Container fluid className={"vw-100 vh-100"}>
    {children}
  </Container>
);

export default HarvestLayout;
