/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata "type" entity schemas component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { MetadataTypeEntityQuery } from "../../../hooks/metadata-type-entity-query";
import MetadataTypeEntitySchema from "../metadataTypeEntitySchema/metadataTypeEntitySchema";
import * as MetadataService from "../../../utils/metadata.service";

// Styles
import compStyles from "./metadataTypeEntitySchemas.module.css";

function MetadataTypeEntitySchemas(props) {
  const { category } = props;
  const typeCategory = MetadataService.findMetadataTypeEntityCategory(
    MetadataTypeEntityQuery(),
    category
  );
  const { schemas } = typeCategory;

  return (
    <div className={compStyles.schemas}>
      {schemas.map((schema, s) => (
        <MetadataTypeEntitySchema key={s} schema={schema} />
      ))}
    </div>
  );
}

export default MetadataTypeEntitySchemas;
