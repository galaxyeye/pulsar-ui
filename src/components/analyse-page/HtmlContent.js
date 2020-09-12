import React from "react";
import PropTypes from "prop-types";

const HtmlContent = ({ title, html }) => {
  return <div className="page-view__html-content style-reset" title={title} dangerouslySetInnerHTML={{__html: html }} />
};

HtmlContent.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The pageViews dataset.
   */
  html: PropTypes.string
};

HtmlContent.defaultProps = {
  title: "",
  html: ""
};

export default HtmlContent;
