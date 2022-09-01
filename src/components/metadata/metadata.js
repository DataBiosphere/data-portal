/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextMetadataDisplaying from "./contextMetadataDisplaying/contextMetadataDisplaying";
import Layout from "../layout";
import MetadataSchema from "./metadataSchema/metadataSchema";
import * as MetadataService from "../../utils/metadata.service";

function Metadata(props) {
  const { activeLocation, entity, nav, sitePageId } = props;
  const { showAllMetadata } = useContext(ContextMetadataDisplaying);
  const category = MetadataService.getMetadataCategory(sitePageId, entity);
  const schema = MetadataService.getMetadataSchema(
    category,
    sitePageId,
    showAllMetadata
  );
  const { description, fields, title } = schema || {},
    { slug } = fields;

  return (
    <Layout
      activeLocation={activeLocation}
      description={description}
      docPath={slug}
      metadataContent={true}
      nav={nav}
      pageTitle={title}
    >
      <MetadataSchema entity={entity} nav={nav} schema={schema} />
    </Layout>
  );
}

export default Metadata;
