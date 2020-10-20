/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search result for properties component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataOverline from "../metadataOverline/metadataOverline";
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

function MetadataSearchResultProperty(props) {

    const {result} = props,
        {propertyPath} = result || {};

    return (
        <>
        <span>
            <MetadataSchemaPropertyWordWrapper font={"hcaCode"} word={propertyPath} wrap/>
        </span>
        <span>
            <MetadataOverline><span>Property</span></MetadataOverline>
        </span>
        <span>
            <MetadataSchemaPropertyFieldFriendlies property={result}/>
            <MetadataSchemaPropertyFieldDescription font={"xs"} property={result}/>
        </span>
        </>
    )
}

export default MetadataSearchResultProperty;
