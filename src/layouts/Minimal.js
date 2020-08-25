import React from "react";
import PropTypes from "prop-types";
import {Container} from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainFooter from "../components/layout/MainFooter";

import TopbarActions from "../components/analyse-page/TopbarActions";

const MinimalLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <MainNavbar />
    <TopbarActions />

    <div id='pulsarHtmlWrapper' className='scrapping wrap'>
      {children}
    </div>

    {!noFooter && <MainFooter />}
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
