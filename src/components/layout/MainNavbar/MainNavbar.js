import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Container, Navbar} from "shards-react";

import NavbarSearch from "./NavbarSearch";
import NavbarToggle from "./NavbarToggle";
import NavbarNav from "./NavbarNav/NavbarNav";

{/* font: https://material.io/resources/icons/?icon=build&style=baseline*/ }

const MainNavbar = ({ defaultUrl, layout, stickyTop, devtoolsSwitch }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    "mb-1",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container className="p-0">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <NavbarSearch defaultUrl={defaultUrl} />
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
