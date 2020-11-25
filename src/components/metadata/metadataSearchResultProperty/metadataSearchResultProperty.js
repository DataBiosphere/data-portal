/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search result for properties component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Highlight from "../../highlight/highlight";
import MetadataOverline from "../metadataOverline/metadataOverline";
import MetadataRequired from "../metadataRequired/metadataRequired";
import MetadataSchemaPropertyFieldDescription from "../metadataSchemaPropertyFieldDescription/metadataSchemaPropertyFieldDescription";
import MetadataSchemaPropertyFieldExample from "../metadataSchemaPropertyFieldExample/metadataSchemaPropertyFieldExample";
import MetadataSchemaPropertyFieldFriendlies from "../metadataSchemaPropertyFieldFriendlies/metadataSchemaPropertyFieldFriendlies";
import MetadataSchemaPropertyFieldGraphRestriction from "../metadataSchemaPropertyFieldGraphRestriction/metadataSchemaPropertyFieldGraphRestriction";
import MetadataSchemaPropertyWordWrapper from "../metadataSchemaPropertyWordWrapper/metadataSchemaPropertyWordWrapper";

function MetadataSearchResultProperty(props) {

    const {result, searchTerm} = props,
        {propertyPath, showClasses, showExample, showOntologies} = result || {};

    return (
        <>
        <span>
            <MetadataSchemaPropertyFieldFriendlies property={result} searchTerm={searchTerm}/>
            <MetadataRequired property={result}/>
        </span>
        <span>
            <MetadataOverline><span>Property</span></MetadataOverline>
        </span>
        <span>
            <Highlight term={searchTerm}><MetadataSchemaPropertyWordWrapper font={"hcaCode"} word={propertyPath} wrap/></Highlight>
            <Highlight term={searchTerm}><MetadataSchemaPropertyFieldDescription font={"xs"} property={result}/></Highlight>
            {showExample ?
                <Highlight term={searchTerm}>
                    <MetadataSchemaPropertyFieldExample font={"xs"} property={result}/>
                </Highlight> : null}
            {showClasses || showOntologies ?
                <Highlight term={searchTerm}>
                    <MetadataSchemaPropertyFieldGraphRestriction property={result} showLink={false}/>
                </Highlight> : null}
        </span>
        </>
    )
}

export default MetadataSearchResultProperty;
