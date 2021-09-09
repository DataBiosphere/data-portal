/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata schema component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import MetadataSchemaNoRequiredProperties from "../metadataSchemaNoRequiredProperties/metadataSchemaNoRequiredProperties";
import MetadataSchemaProperties from "../metadataSchemaProperties/metadataSchemaProperties";
import MetadataSchemaUsedBys from "../metadataSchemaUsedBys/metadataSchemaUsedBys";
import MetadataToggleRequiredFields from "../metadataToggleRequiredFields/metadataToggleRequiredFields";
import {Relationship} from "../../../utils/anchor/relationship.model";
import {Target} from "../../../utils/anchor/target.model";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./metadataSchema.module.css";
import * as fontStyles from "../../../styles/fontsize.module.css";

function MetadataSchema(props) {
  const { schema } = props,
    { description, properties, schemaName, title, urlGitHub, urlTo } =
      schema || {};
  const { highlightValue } = useContext(ContextMetadataDisplaying);
  const showHighlighter = highlightValue === urlTo;
  const showProperties = properties.length > 0;

  return (
    <>
      <h2>
        <span className={classNames({ [compStyles.reveal]: showHighlighter })}>
          {title}
        </span>
      </h2>
      <p className={compStyles.description}>
        <span className={classNames({ [compStyles.reveal]: showHighlighter })}>
          {description}
        </span>
      </p>
      <div className={compStyles.source}>
        <span className={fontStyles.xs}>View JSON source: </span>
        <a
          className={fontStyles.s}
          href={urlGitHub}
          rel={Relationship.NOOPENER}
          target={Target.BLANK}
        >
          {schemaName}
        </a>
        <MetadataToggleRequiredFields background />
      </div>
      <h3>Properties</h3>
      {showProperties ? (
        <MetadataSchemaProperties properties={properties} schema={schema} />
      ) : (
        <MetadataSchemaNoRequiredProperties />
      )}
      <MetadataSchemaUsedBys schema={schema} />
    </>
  );
}

export default MetadataSchema;
