/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - chip component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./chip.module.css";

function Chip(props) {
  const { children } = props;

  return <span className={compStyles.chip}>{children}</span>;
}

export default Chip;
