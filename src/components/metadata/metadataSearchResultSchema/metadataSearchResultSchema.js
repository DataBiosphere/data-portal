/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search result for schemas component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Highlight from "../../highlight/highlight";
import MetadataOverline from "../metadataOverline/metadataOverline";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

// Class name helper
import classNames from "classnames";

// Styles
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataSearchResultSchema(props) {
  const { result, searchTerm } = props,
    { description, schemaName, title } = result || {};

  return (
    <>
      <span>
        <Highlight term={searchTerm}>
          <span className={classNames(fontStyles.regular, fontStyles.s)}>
            {title}
          </span>
        </Highlight>
      </span>
      <span>
        <MetadataOverline>
          <span>Entity</span>
        </MetadataOverline>
      </span>
      <span>
        <Highlight term={searchTerm}>
          <MetadataSchemaPropertyWordWrapper
            font={"hcaCode"}
            word={schemaName}
            wrap
          />
        </Highlight>
        <Highlight term={searchTerm}>
          <span className={fontStyles.xs}>{description}</span>
        </Highlight>
      </span>
    </>
  );
}

export default MetadataSearchResultSchema;
