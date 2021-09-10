/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata "type" entity schema component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Styles
import * as compStyles from "./metadataTypeEntitySchema.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataTypeEntitySchema(props) {
  const { schema } = props,
    { description, title, urlTo } = schema;

  return (
    <span className={compStyles.schema}>
      <Link to={urlTo}>{title}</Link>
      <span className={fontStyles.xs}>{description}</span>
    </span>
  );
}

export default MetadataTypeEntitySchema;
