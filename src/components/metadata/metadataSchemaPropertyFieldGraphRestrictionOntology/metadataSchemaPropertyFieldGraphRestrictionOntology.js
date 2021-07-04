/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field graph restriction ontology component.
 */

// Core dependencies
import React from "react";

// App dependencies
import * as MetadataService from "../../../utils/metadata.service";

function MetadataSchemaPropertyFieldGraphRestrictionOntology(props) {
  const { first, ontology, showLink } = props;
  const linkTo = MetadataService.buildOntologySearchUrl(ontology);

  return (
    <>
      {first ? null : <span> or </span>}
      {showLink ? (
        <a href={linkTo} rel="noopener noreferrer" target="_blank">
          {ontology}
        </a>
      ) : (
        <span>{ontology}</span>
      )}
    </>
  );
}

export default MetadataSchemaPropertyFieldGraphRestrictionOntology;
