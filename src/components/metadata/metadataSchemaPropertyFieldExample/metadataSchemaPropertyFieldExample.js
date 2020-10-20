/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field example component.
 */

// Core dependencies
import React from "react";

function MetadataSchemaPropertyFieldExample(props) {

    const {property} = props,
        {example} = property;

    return (
        <span>{example}</span>
    );
}

export default MetadataSchemaPropertyFieldExample;
