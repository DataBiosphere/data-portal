/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field graph restriction ontologies component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetdataSchemaPropertyFieldGraphRestrictionOntology from "../metadataSchemaPropertyFieldGraphRestrictionOntology/metadataSchemaPropertyFieldGraphRestrictionOntology";

function MetadataSchemaPropertyFieldGraphRestrictionOntologies(props) {
  const { ontologies, showLink } = props;

  return ontologies.map((ontology, o) => (
    <MetdataSchemaPropertyFieldGraphRestrictionOntology
      key={o}
      first={o === 0}
      ontology={ontology}
      showLink={showLink}
    />
  ));
}

export default MetadataSchemaPropertyFieldGraphRestrictionOntologies;
