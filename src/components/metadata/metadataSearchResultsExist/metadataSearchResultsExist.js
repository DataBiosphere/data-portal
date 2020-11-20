/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search results exist component.
 */

// Core dependencies
import React from "react";

// App dependencies
import MetadataSearchResult from "../metadataSearchResult/metadataSearchResult";
import MetadataSearchResultsPanelKeyDownSpy from "../metadataSearchResultsPanelKeyDownSpy/metadataSearchResultsPanelKeyDownSpy";

function MetadataSearchResultsExist(props) {

    const {results} = props;

    return (
        <MetadataSearchResultsPanelKeyDownSpy results={results}>
            {results.map((result, r) =>
                <MetadataSearchResult key={r}
                                      counter={r}
                                      result={result}/>)}
        </MetadataSearchResultsPanelKeyDownSpy>
    )
}

export default React.memo(MetadataSearchResultsExist);
