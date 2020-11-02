/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - a React Context object for the displaying of metadata.
 * Includes the metadata toggle required fields value, and highlighting property hits after searching and selecting.
 * Used by metadata pages - facilitates the toggle between showing all metadata fields,
 * or only required fields and highlighting properties after searching and selecting.
 */

// Core dependencies
import React from "react";

const ContextMetadataDisplaying = React.createContext({
    highlightActive: false,
    highlightValue: "",
    showAllMetadata: true,
    onHandleSearchHit: () => {},
    onHandleToggleRequiredFields: () => {}
});

export default ContextMetadataDisplaying;
