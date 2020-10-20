/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search result for schemas component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataOverline from "../metadataOverline/metadataOverline";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

const classNames = require("classnames");

function MetadataSearchResultSchema(props) {

    const {result} = props,
        {description, schemaName, title} = result || {};

    return (
        <>
        <span>
            <MetadataSchemaPropertyWordWrapper font={"hcaCode"} word={schemaName} wrap/>
        </span>
        <span>
            <MetadataOverline><span>Entity</span></MetadataOverline>
        </span>
        <span>
            <span className={classNames(fontStyles.regular, fontStyles.s)}>{title}</span>
            <span className={fontStyles.xs}>{description}</span>
        </span>
        </>
    )
}

export default MetadataSearchResultSchema;
