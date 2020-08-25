import React from "react";

import * as PropTypes from "prop-types";
import HtmlContent from "../components/analyse-page/HtmlContent";
import {Col, Container, Row} from "shards-react";
import "../assets/css/sketch.css";
import "../assets/css/web-page-view.css";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import TopbarActions from "../components/analyse-page/TopbarActions";

const SketchLayout = ({ children, noNavbar, noFooter }) => (
  <Container fluid>
    <MainNavbar />
    <TopbarActions />

    <div className="shapes">
      <link rel="stylesheet" type="text/css" href="/styles/jquery/jquery-ui-1.11.4.css" />
      <link rel="stylesheet" type="text/css" href="/styles/sketch/dropper.css" />
      <link rel="stylesheet" type="text/css" href="/styles/sketch/web-page-view.css" />

      <div className="canvas">
        <HtmlContent/>
        <HtmlContent/>
        <HtmlContent/>
        <HtmlContent/>
        <HtmlContent/>
        <HtmlContent/>
      </div>
    </div>
  </Container>
);

SketchLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

SketchLayout.defaultProps = {
  noNavbar: false,
  noFooter: true
};

export default SketchLayout;
