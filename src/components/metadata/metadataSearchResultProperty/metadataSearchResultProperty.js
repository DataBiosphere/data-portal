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
import MetadataSchemaPropertyFieldExample from "../metadataSchemaPropertyFieldExample/metadataSchemaPropertyFieldExample";
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyFieldGraphRestriction from "../metadataSchemaPropertyFieldGraphRestriction/metadataSchemaPropertyFieldGraphRestriction";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

function MetadataSearchResultProperty(props) {

    const {result} = props,
        {propertyPath, showClasses, showExample, showOntologies} = result || {};

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
            {showExample ? <MetadataSchemaPropertyFieldExample font={"xs"} property={result}/> : null}
            {showClasses || showOntologies ? <MetadataSchemaPropertyFieldGraphRestriction property={result} showLink={false}/> : null}
        </span>
        </>
    )
}

export default MetadataSearchResultProperty;
