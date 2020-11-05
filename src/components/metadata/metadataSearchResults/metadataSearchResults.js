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
import MetadataSearchResultsPanelKeyDownSpy from "../metadataSearchResultsPanelKeyDownSpy/metadataSearchResultsPanelKeyDownSpy";

// Styles
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSearchResults() {

    const {results, showResultsPanel} = useContext(ContextMetadataSearch);

    return (
        showResultsPanel ?
            <MetadataSearchResultsPanel>
                <h5 className={fontStyles.l} id={"hero"}>Search Results</h5>
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
