/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema property field from ref component.
 * Property from (reference to another schema).
 */

// Core dependencies
import Link from "gatsby-link";
import React from "react";

function MetadataSchemaPropertyFieldFromRef(props) {
  const { property } = props,
    { primary, propertyFrom, propertyFromLink, referenceFrom } = property;
  const showPropertyFrom = !primary && propertyFrom && !referenceFrom;

  return showPropertyFrom ? (
    <span>
      <span> from </span>
      <Link to={propertyFromLink}>{propertyFrom}</Link>
    </span>
  ) : null;
}

export default MetadataSchemaPropertyFieldFromRef;
