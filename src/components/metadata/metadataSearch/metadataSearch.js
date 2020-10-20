/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search component.
 */

// Core dependencies
import React, {useMemo} from "react";

// App dependencies
import {MetadataSchemaQuery} from "../../../hooks/metadata-schema-query";
import {MetadataSchemaPropertiesQuery} from "../../../hooks/metadata-schema-properties-query";
import MetadataSearchInput from "../metadataSearchInput/metadataSearchInput";
import MetadataSearchNoResult from "../metadataSearchNoResult/metadataSearchNoResult";
import MetadataSearchResults from "../metadataSearchResults/metadataSearchResults";
import ProviderMetadataIndexing from "../providerMetadataIndexing/providerMetadataIndexing";
import * as MetadataSearchService from "../../../utils/metadata-search.service";

// Styles
import compStyles from "./metadataSearch.module.css";

// Template variables
const metadataIndexFileName = "/metadata-index.json";
const lunrIndexRefField = "id";

function MetadataSearch(props) {

    const {onMenuOpen} = props;
    const properties = MetadataSchemaPropertiesQuery();
    const schemas = MetadataSchemaQuery();
    const setOfProperties = MetadataSearchService.getSetOfProperties(properties, lunrIndexRefField);
    const setOfSearchGroups = MetadataSearchService.getSetOfSearchGroups();

    return useMemo(() => {
        return (
            <ProviderMetadataIndexing metadataIndexFileName={metadataIndexFileName}
                                      onMenuOpen={onMenuOpen}
                                      properties={properties}
                                      resultKey={lunrIndexRefField}
                                      schemas={schemas}
                                      setOfProperties={setOfProperties}
                                      setOfSearchGroups={setOfSearchGroups}>
                <div className={compStyles.search}>
                    <MetadataSearchInput/>
                    <MetadataSearchNoResult/>
                    <MetadataSearchResults/>
                </div>
            </ProviderMetadataIndexing>
        );
    }, [onMenuOpen, properties, setOfProperties, setOfSearchGroups, schemas]);
}

export default MetadataSearch;
