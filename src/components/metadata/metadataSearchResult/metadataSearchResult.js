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
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchResultProperty from "../metadataSearchResultProperty/metadataSearchResultProperty";
import MetadataSearchResultSchema from "../metadataSearchResultSchema/metadataSearchResultSchema";

// Styles
import compStyles from "./metadataSearchResult.module.css";

function MetadataSearchResult(props) {

    const {result} = props,
        {type} = result || {};
    const {onHandleNavigationHit} = useContext(ContextMetadataDisplaying);
    const {inputValue} = useContext(ContextMetadataSearch);
    const showSchema = /schema/.test(type);

    return (
        <ClickHandler className={compStyles.result} clickAction={() => onHandleNavigationHit(result)} tag={"div"}>
            {showSchema ?
                <MetadataSearchResultSchema result={result} searchTerm={inputValue}/> :
                <MetadataSearchResultProperty result={result} searchTerm={inputValue}/>}
        </ClickHandler>
    )
}

export default MetadataSearchResult;
