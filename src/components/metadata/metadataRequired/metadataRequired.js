/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata required component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Chip from "../../chip/chip";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataRequired.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataRequired(props) {
  const { property } = props,
    { required } = property;

  return required ? (
    <Chip>
      <span className={classNames(compStyles.required, fontStyles.xxs)}>
        Required
      </span>
    </Chip>
  ) : null;
}

export default MetadataRequired;
