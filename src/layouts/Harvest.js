import React from "react";

import "../assets/css/harvest.css";
import "../assets/css/reset.css";
import {Container} from "shards-react";

const HarvestLayout = ({ children }) => (
  <Container fluid className={"vw-100 vh-100"}>
    {children}
  </Container>
);

export default HarvestLayout;
