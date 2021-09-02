/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field graph restriction class component.
 */

// Core dependencies
import React from "react";

// App dependencies
import {Relationship} from "../../../utils/anchor/relationship.model";
import {Target} from "../../../utils/anchor/target.model";
import * as MetadataService from "../../../utils/metadata.service";

function MetadataSchemaPropertyFieldGraphRestrictionClass(props) {
  const { first, identifier, ontology, showLink } = props;
  const url = MetadataService.buildOntologyTermUrl(ontology, identifier);

  return (
    <>
      {first ? null : <span>, </span>}
      {showLink && url ? (
        <a href={url} rel={Relationship.NOOPENER} target={Target.BLANK}>
          {identifier}
        </a>
      ) : (
        <span>{identifier}</span>
      )}
    </>
  );
}

export default MetadataSchemaPropertyFieldGraphRestrictionClass;
