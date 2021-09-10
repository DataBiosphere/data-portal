/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property panel component.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataSchemaPropertyPanel.module.css";

function MetadataSchemaPropertyPanel(props) {
  const {
    children,
    border,
    highlighter,
    hover,
    identifier,
    onHandleClick,
    secondary,
    tertiary,
  } = props;
  const attributes = {
    ...(identifier && { id: identifier }),
    ...(onHandleClick && { role: "presentation" }),
  };
  const classNamesPanel = classNames(
    { [compStyles.border]: border },
    { [compStyles.highlighter]: highlighter },
    { [compStyles.hover]: hover },
    compStyles.property,
    { [compStyles.secondary]: secondary },
    { [compStyles.tertiary]: tertiary }
  );
  const events = { ...(onHandleClick && { onClick: onHandleClick }) };

  return (
    <div className={classNamesPanel} {...attributes} {...events}>
      {children}
    </div>
  );
}

export default MetadataSchemaPropertyPanel;
