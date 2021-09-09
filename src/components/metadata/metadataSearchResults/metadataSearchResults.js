/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search results component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchResultsEmpty from "../metadataSearchResultsEmpty/metadataSearchResultsEmpty";
import MetadataSearchResultsExist from "../metadataSearchResultsExist/metadataSearchResultsExist";
import MetadataSearchResultsPanel from "../metadataSearchResultsPanel/metadataSearchResultsPanel";
import MetadataSearchResultsPanelHeader from "../metadataSearchResultsPanelHeader/metadataSearchResultsPanelHeader";

// Styles
import * as compStyles from "./metadataSearchResults.module.css";

function MetadataSearchResults() {
  const { results, showResultsPanel } = useContext(ContextMetadataSearch);
  const resultsExist = results && results.length > 0;
  const panelHeroText = resultsExist ? "Search Results" : "No Results";

  return showResultsPanel ? (
    <MetadataSearchResultsPanel>
      <MetadataSearchResultsPanelHeader>
        {panelHeroText}
      </MetadataSearchResultsPanelHeader>
      <div className={compStyles.results}>
        {resultsExist ? (
          <MetadataSearchResultsExist results={results} />
        ) : (
          <MetadataSearchResultsEmpty />
        )}
      </div>
    </MetadataSearchResultsPanel>
  ) : null;
}

export default React.memo(MetadataSearchResults);
