/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata toggle required fields component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import Checkbox from "../../checkbox/checkbox";
import ContextMetadataToggleRequiredFields from "../contextMetadataToggleRequiredFields/contextMetadataToggleRequiredFields";

function MetadataToggleRequiredFields() {

    const {showAllMetadata, onHandleToggleRequiredFields} = useContext(ContextMetadataToggleRequiredFields);
    const label = "Show required fields only";

    return (
        <Checkbox checked={!showAllMetadata} clickAction={onHandleToggleRequiredFields} label={label} value={"showMetadata"}/>
    );
}

export default MetadataToggleRequiredFields;
