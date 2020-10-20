/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search result component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ClickHandler from "../../clickHandler/clickHandler";
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import ContextMetadataToggleRequiredFields from "../contextMetadataToggleRequiredFields/contextMetadataToggleRequiredFields";
import MetadataSearchResultProperty from "../metadataSearchResultProperty/metadataSearchResultProperty";
import MetadataSearchResultSchema from "../metadataSearchResultSchema/metadataSearchResultSchema";

// Styles
import compStyles from "./metadataSearchResult.module.css";

function MetadataSearchResult(props) {

    const {result} = props,
        {type, urlTo} = result || {};
    const {showAllMetadata, onHandleToggleRequiredFields} = useContext(ContextMetadataToggleRequiredFields);
    const {onHandleInput, onHandleEsc} = useContext(ContextMetadataSearch);
    const showSchema = /schema/.test(type);

    const redirectTo = () => {

        /* Toggle required fields, if "Show required fields only" is true. */
        if ( !showAllMetadata ) {

            onHandleToggleRequiredFields();
        }

        /* Grab the current path and compare against selected path. */
        /* Assign timer value if the selected path (doesn't have a hash value) is not the same as the current path. */
        const currentPathName = window.location.pathname;
        const hasHash = urlTo.includes("#");
        const redirectToSamePage = urlTo.startsWith(currentPathName) && hasHash;
        const timer = redirectToSamePage ? 0 : 250;

        if ( !redirectToSamePage ) {

            /* Redirect first. */
            window.location.href = urlTo;
        }

        /* Clear inputs and toggle site scrolling. */
        /* Handle case redirect is on the same page with a hash value. */
        /* Timer added when redirecting to a new page. */
        setTimeout(() => {

            /* Clear input. */
            onHandleInput("");

            /* Toggle site scrolling. */
            onHandleEsc(false);

            if ( redirectToSamePage ) {

                /* Redirect last. */
                window.location.href = urlTo;
            }
        }, timer);
    };

    return (
        <ClickHandler className={compStyles.result} clickAction={redirectTo} tag={"div"}>
            {showSchema ? <MetadataSearchResultSchema result={result}/> : <MetadataSearchResultProperty result={result}/>}
        </ClickHandler>
    )
}

export default MetadataSearchResult;
