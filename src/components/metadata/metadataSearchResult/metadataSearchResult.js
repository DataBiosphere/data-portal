/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - metadata search result component.
 */

// Core dependencies
import React, {useContext, useEffect, useRef} from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchResultProperty from "../metadataSearchResultProperty/metadataSearchResultProperty";
import MetadataSearchResultSchema from "../metadataSearchResultSchema/metadataSearchResultSchema";

// Styles
import compStyles from "./metadataSearchResult.module.css";

const classNames = require("classnames");

function MetadataSearchResult(props) {

    const {active, counter, result, setActiveCounter, setActiveResult, setActiveResultEl} = props,
        {type} = result || {};
    const {onHandleNavigationSearchHit} = useContext(ContextMetadataDisplaying);
    const {inputValue} = useContext(ContextMetadataSearch);
    const resultEl = useRef(null);
    const showSchema = /schema/.test(type);

    /* useEffect - componentDidUpdate - active. */
    /* Sets state active result and active result element. */
    /* Handles scrolling to maintain visibility of any active result. */
    useEffect(() => {

        if ( active ) {

            setActiveResult(result);
            setActiveResultEl(resultEl.current);
        }
    }, [active, result, setActiveResult, setActiveResultEl]);

    /* Classnames. */
    const classNamesResult = classNames({[compStyles.active]: active}, compStyles.result);

    return (
        <div className={classNamesResult}
             onClick={() => onHandleNavigationSearchHit(result, inputValue)}
             onMouseMove={() => setActiveCounter(counter)}
             ref={resultEl}
             role={"presentation"}>
            {showSchema ?
                <MetadataSearchResultSchema result={result} searchTerm={inputValue}/> :
                <MetadataSearchResultProperty result={result} searchTerm={inputValue}/>}
        </div>
    )
}

export default React.memo(MetadataSearchResult);
