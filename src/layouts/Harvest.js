import React from "react";

import "../assets/css/harvest.css";
import {Container} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/shards/styles/shards-dashboards.1.1.0.css";

const HarvestLayout = ({ children }) => (
  <Container fluid className={"vw-100 vh-100"}>
    {children}
  </Container>
);

export default HarvestLayout;
