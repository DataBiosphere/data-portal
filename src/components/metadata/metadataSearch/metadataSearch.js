/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search component.
 */

// Core dependencies
import React from "react";

// App dependencies
import { MetadataSchemaQuery } from "../../../hooks/metadata-schema-query";
import { MetadataSchemaPropertiesQuery } from "../../../hooks/metadata-schema-properties-query";
import MetadataSearchInput from "../metadataSearchInput/metadataSearchInput";
import MetadataSearchResults from "../metadataSearchResults/metadataSearchResults";
import ProviderMetadataSearching from "../providerMetadataSearching/providerMetadataSearching";
import * as MetadataSearchService from "../../../utils/metadata-search.service";

// Styles
import compStyles from "./metadataSearch.module.css";

// Template variables
const metadataIndexFileName = "/metadata-index.json";
const lunrIndexRefField = "id";

function MetadataSearch(props) {
  const { onHandleSiteScroll } = props;
  const properties = MetadataSchemaPropertiesQuery();
  const schemas = MetadataSchemaQuery();
  const setOfProperties = MetadataSearchService.getSetOfProperties(
    properties,
    lunrIndexRefField
  );
  const setOfSearchGroups = MetadataSearchService.getSetOfSearchGroups();

  return (
    <ProviderMetadataSearching
      metadataIndexFileName={metadataIndexFileName}
      onHandleSiteScroll={onHandleSiteScroll}
      properties={properties}
      resultKey={lunrIndexRefField}
      schemas={schemas}
      setOfProperties={setOfProperties}
      setOfSearchGroups={setOfSearchGroups}
    >
      <div className={compStyles.search}>
        <MetadataSearchInput />
        <MetadataSearchResults />
      </div>
    </ProviderMetadataSearching>
  );
}

export default React.memo(MetadataSearch);
