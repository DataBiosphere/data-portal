/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema properties component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSchemaProperty from "../metadataSchemaProperty/metadataSchemaProperty";

function MetadataSchemaProperties(props) {
  const { properties } = props;

  return properties.map((property, p) => (
    <MetadataSchemaProperty key={p} property={property} />
  ));
}

export default MetadataSchemaProperties;
