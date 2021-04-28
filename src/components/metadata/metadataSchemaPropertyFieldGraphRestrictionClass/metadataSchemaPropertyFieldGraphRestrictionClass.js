/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field graph restriction class component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as MetadataService from "../../../utils/metadata.service";

function MetadataSchemaPropertyFieldGraphRestrictionClass(props) {

    const {first, identifier, ontology, showLink} = props;
    const url = MetadataService.buildOntologyTermUrl(ontology, identifier);

    return (
        <>
        {first ? null : <span>, </span>}
        {showLink && url ?
            <a href={url} rel="noopener noreferrer" target="_blank">{identifier}</a> :
            <span>{identifier}</span>}
        </>
    );
}

export default MetadataSchemaPropertyFieldGraphRestrictionClass;
