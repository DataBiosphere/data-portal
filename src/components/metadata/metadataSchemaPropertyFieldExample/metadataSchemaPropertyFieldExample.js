/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field example component.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaPropertyFieldExample(props) {
  const { font, property } = props,
    { example } = property;

  return (
    <span className={classNames({ [fontStyles[font]]: !!font })}>
      {example}
    </span>
  );
}

export default MetadataSchemaPropertyFieldExample;
