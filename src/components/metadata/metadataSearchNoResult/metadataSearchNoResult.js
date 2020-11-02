/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search error component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchResultsPanel from "../metadataSearchResultsPanel/metadataSearchResultsPanel";

// Styles
import compStyles from "./metadataSearchNoResult.module.css";
import fontStyles from "../../../styles/fontsize.module.css";

function MetadataSearchNoResults() {

    const {showNoResultsPanel} = useContext(ContextMetadataSearch);

    return (
        showNoResultsPanel ?
            <MetadataSearchResultsPanel error>
                <h5 className={fontStyles.l} id={"hero"}>No Results</h5>
                <div className={compStyles.result}>
                    <p className={fontStyles.s}>Oops! We don’t have an exact match, it may be called by a different name.</p>
                    <p className={fontStyles.s}>Try starting with a schema name, for example "cell_line" or "specimen_from_organism".</p>
                </div>
            </MetadataSearchResultsPanel> : null
    );
}

export default MetadataSearchNoResults;
