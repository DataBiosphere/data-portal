/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search results panel component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./metadataSearchResultsPanel.module.css";

function MetadataSearchResultsPanel(props) {

    const {children} = props;

    return (
        <div className={compStyles.panel}>{children}</div>
    )
}

export default MetadataSearchResultsPanel;
