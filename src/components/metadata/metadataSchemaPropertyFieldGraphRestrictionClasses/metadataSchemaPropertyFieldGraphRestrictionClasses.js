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
    const ontology = MetadataService.selectPreferredOntologyId(ontologies);

    return (
        classes.map((identifier, i) =>
            <MetdataSchemaPropertyFieldGraphRestrictionClass key={i}
                                                             first={i === 0}
                                                             identifier={identifier}
                                                             ontology={ontology}
                                                             showLink={showLink}/>)
    );
}

export default MetadataSchemaPropertyFieldGraphRestrictionClasses;
