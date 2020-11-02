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

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSearchResults() {

    const searching = useContext(ContextMetadataSearch),
        {results, showResultsPanel} = searching;

    return (
        showResultsPanel ?
            <MetadataSearchResultsPanel>
                <h5 className={fontStyles.l} id={"hero"}>Search Results</h5>
                {results.map((result, r) => <MetadataSearchResult key={r} result={result}/>)}
            </MetadataSearchResultsPanel> : null
    )
}

export default MetadataSearchResults;
