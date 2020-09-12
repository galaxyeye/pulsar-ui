import React from "react";
import PropTypes from "prop-types";
import {Container} from "shards-react";

import "../assets/css/vesperr-style.css"

const MinimalLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    {children}
  </Container>
);

MinimalLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

MinimalLayout.defaultProps = {
  noNavbar: false,
  noFooter: true
};

export default MinimalLayout;
