/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field graph restriction classes component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetdataSchemaPropertyFieldGraphRestrictionClass from "../metadataSchemaPropertyFieldGraphRestrictionClass/metadataSchemaPropertyFieldGraphRestrictionClass";
import * as MetadataService from "../../../utils/metadata.service";

function MetadataSchemaPropertyFieldGraphRestrictionClasses(props) {

    const {classes, ontologies, showLink} = props;
    const ontologyId = MetadataService.getOntologyIdentifier(ontologies);

    return (
        classes.map((restriction, c) =>
            <MetdataSchemaPropertyFieldGraphRestrictionClass key={c}
                                                             first={c === 0}
                                                             ontologyId={ontologyId}
                                                             restriction={restriction}
                                                             showLink={showLink}/>)
    );
}

export default MetadataSchemaPropertyFieldGraphRestrictionClasses;
