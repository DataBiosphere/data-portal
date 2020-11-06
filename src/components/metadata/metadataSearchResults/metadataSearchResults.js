/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search results component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchResult from "../metadataSearchResult/metadataSearchResult";
import MetadataSearchResultsPanel from "../metadataSearchResultsPanel/metadataSearchResultsPanel";
import MetadataSearchResultsPanelHeader from "../metadataSearchResultsPanelHeader/metadataSearchResultsPanelHeader";
import MetadataSearchResultsPanelKeyDownSpy from "../metadataSearchResultsPanelKeyDownSpy/metadataSearchResultsPanelKeyDownSpy";

function MetadataSearchResults() {

    const {results, showResultsPanel} = useContext(ContextMetadataSearch);

    return (
        showResultsPanel ?
            <MetadataSearchResultsPanel>
                <MetadataSearchResultsPanelHeader>Search Results</MetadataSearchResultsPanelHeader>
                <MetadataSearchResultsPanelKeyDownSpy results={results}>
                    {results.map((result, r) =>
                        <MetadataSearchResult key={r}
                                              counter={r}
                                              result={result}/>)}
                </MetadataSearchResultsPanelKeyDownSpy>
            </MetadataSearchResultsPanel> : null
    )
}

export default React.memo(MetadataSearchResults);
