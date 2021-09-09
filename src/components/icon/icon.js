/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal icon component.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./icon.module.css";

function Icon(props) {
  const { children, fontSize, showHover, showIcon } = props;
  const size = fontSize ? `${fontSize}px` : "24px";
  const classNamesIcon = classNames(
    { [compStyles.hover]: showHover },
    compStyles.icon,
    "material-icons",
    { [compStyles.show]: showIcon }
  );

  return (
    <i className={classNamesIcon} style={{ fontSize: size }}>
      {children}
    </i>
  );
}

export default Icon;
