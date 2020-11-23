/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search results panel key down spy component.
 */

// Core dependencies
import React, {useContext, useEffect, useState} from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchResultsPanelScrollSpy from "../metadataSearchResultsPanelScrollSpy/metadataSearchResultsPanelScrollSpy";
import * as MetadataSearchService from "../../../utils/metadata-search.service";

function MetadataSearchResultsPanelKeyDownSpy(props) {

    const {children, results} = props;
    const {inputValue} = useContext(ContextMetadataSearch);
    const {onHandleNavigationSearchHit} = useContext(ContextMetadataDisplaying);
    const [activeCounter, setActiveCounter] = useState(-1);
    const [activeResult, setActiveResult] = useState(null);
    const [activeResultEl, setActiveResultEl] = useState(null);
    const [keyDownCode, setKeyDownCode] = useState("");
    const [resultsDepth, setResultsDepth] = useState(0);

    /* useEffect - componentDidMount/componentWillUnmount. */
    /* Event listener - "keydown". */
    useEffect(() => {

        /* Add event listeners. */
        document.addEventListener("keydown", onHandleKeyDown);

        return() => {

            /* Remove event listeners. */
            document.removeEventListener("keydown", onHandleKeyDown);
        }
    }, []);

    /* useEffect - componentDidUpdate - results. */
    /* Updates state resultsDepth with change of results. */
    useEffect(() => {

        const depth = results.length - 1;
        setResultsDepth(depth);
    }, [results]);

    /* useEffect - key event. */
    useEffect(() => {

        /* Handle arrow down event. */
        if ( keyDownCode === "ArrowDown" ) {

            setActiveCounter(MetadataSearchService.onHandleSearchResultArrowDown(activeCounter, resultsDepth));
        }

        /* Handle arrow up event. */
        if ( keyDownCode === "ArrowUp" ) {

            setActiveCounter(MetadataSearchService.onHandleSearchResultArrowUp(activeCounter, resultsDepth));
        }

        /* Handle enter event. */
        if ( keyDownCode === "Enter" && activeResult ) {

            onHandleNavigationSearchHit(activeResult, inputValue);
        }

        /* Clear key down code. */
        setKeyDownCode("");
    }, [activeCounter, activeResult, inputValue, keyDownCode, resultsDepth, onHandleNavigationSearchHit]);

    const onHandleKeyDown = (keyEvent) => {

        setKeyDownCode(keyEvent.code);
    };

    return (
        <MetadataSearchResultsPanelScrollSpy activeResultEl={activeResultEl}>
            {React.Children.map(children, (child, c) =>
                React.cloneElement(child, {
                    active: c === activeCounter,
                    setActiveCounter: setActiveCounter,
                    setActiveResult: setActiveResult,
                    setActiveResultEl: setActiveResultEl}))}
        </MetadataSearchResultsPanelScrollSpy>
    )
}

export default MetadataSearchResultsPanelKeyDownSpy;
