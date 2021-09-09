/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search results panel header "hero" component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSearchClose from "../metadataSearchClose/metadataSearchClose";

// Styles
import * as compStyles from "./metadataSearchResultsPanelHeader.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataSearchResultsPanelHeader(props) {
  const { children } = props;

  return (
    <div className={compStyles.hero}>
      <h5 className={fontStyles.l}>{children}</h5>
      <MetadataSearchClose />
    </div>
  );
}

export default MetadataSearchResultsPanelHeader;
