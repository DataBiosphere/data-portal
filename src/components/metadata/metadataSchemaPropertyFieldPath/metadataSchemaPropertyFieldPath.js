/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field path component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Clipboard from "../clipboardCopy/clipboardCopy";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";
import Tooltip from "../../tooltip/tooltip";

// Images
import copyIcon from "../../../../images/icon/clipboard/copy.png";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataSchemaPropertyFieldPath.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchemaPropertyFieldPath(props) {
  const { active, property, wrap } = props,
    { propertyPath } = property;
  const classNamesPropertyPath = classNames(
    fontStyles.hcaCode,
    compStyles.propertyPath
  );

  return (
    <Clipboard copyText={propertyPath}>
      <span className={classNamesPropertyPath}>
        <MetadataSchemaPropertyWordWrapper word={propertyPath} wrap={wrap}>
          <Tooltip label={"Copy"}>
            <img
              className={classNames({ [compStyles.show]: active })}
              src={copyIcon}
              alt={"copy"}
            />
          </Tooltip>
        </MetadataSchemaPropertyWordWrapper>
      </span>
    </Clipboard>
  );
}

export default MetadataSchemaPropertyFieldPath;
