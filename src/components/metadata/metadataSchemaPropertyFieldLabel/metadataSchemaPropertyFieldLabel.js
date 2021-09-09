/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field label component.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataSchemaPropertyFieldLabel.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaPropertyFieldLabel(props) {
  const { children, property } = props,
    { label } = property;

  return (
    <span
      className={classNames(
        compStyles.propertyName,
        fontStyles.regular,
        fontStyles.s
      )}
    >
      {label}
      {children}
    </span>
  );
}

export default MetadataSchemaPropertyFieldLabel;
