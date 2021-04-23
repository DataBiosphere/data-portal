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

    const {first, ontologyId, restriction, showLink} = props;
    const linkTo = MetadataService.buildOntologyTermUrl(ontologyId, restriction);
    const linkText = `${ontologyId}/${restriction}`;

    return (
        <>
        {first ? null : <span>, </span>}
        {showLink && linkTo ?
            <a href={linkTo} rel="noopener noreferrer" target="_blank">{linkText}</a> :
            <span>{restriction}</span>}
        </>
    );
}

export default MetadataSchemaPropertyFieldGraphRestrictionClass;
