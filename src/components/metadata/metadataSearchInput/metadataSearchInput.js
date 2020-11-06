/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search input component.
 */

// Core dependencies
import { globalHistory, useLocation } from "@reach/router";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchInputClear from "../metadataSearchInputClear/metadataSearchInputClear";

// Styles
import compStyles from "./metadataSearchInput.module.css";

function MetadataSearchInput() {

    const {inputActive, onHandleInput, onHandleSearchClose, onHandleSearchOpen} = useContext(ContextMetadataSearch);
    const currentLocation = useLocation();
    const inputRef = useRef(null);
    const [inputText, setInputText] = useState("");
    const [timer, setTimer] = useState(0);
    const showClear = !!inputText;

    const onHandleChange = (event) => {

        const text = event.target.value;

        setTimer(500);
        setInputText(text);
    };

    const onHandleClearInput = useCallback(() => {

        /* Maintain <input> focus. */
        /* Set timer to zero and clear the input. */
        inputRef.current.focus();
        setTimer(0);
        setInputText("");
    }, []);

    const onHandleKeyDown = useCallback((keyEvent) => {

        const {key} = keyEvent;

        if ( key === "Escape" ) {

            onHandleSearchClose();
        }
    }, [onHandleSearchClose]);

    /* useEffect - componentDidMount/componentWillUnmount. */
    useEffect(() => {

        /* Add event listener "keydown" [escape key] to handle closing of search. */
        document.addEventListener("keydown", onHandleKeyDown, false);

        return () => {

            /* Remove event listeners. */
            document.removeEventListener("keydown", onHandleKeyDown, false);
        }
    }, [onHandleKeyDown]);

    /* useEffect - componentDidUpdate - inputActive. */
    /* Handles external control of focus changes to the <input>. */
    /* e.g. keyed selection of search result. */
    useEffect(() => {

        if ( !inputActive ) {

            inputRef.current.blur();
            setTimer(0);
            setInputText("");
        }
    }, [inputActive]);

    /* useEffect - componentDidUpdate - inputText. */
    /* Handles changes on <input>. */
    useEffect(() => {

        /* Delay search over entities to improve performance on rendering input value. */
        const delaySearch = setTimeout(() => onHandleInput(inputText), timer);
        return () => clearTimeout(delaySearch);
    }, [inputText, onHandleInput, timer]);

    /* useEffect - componentDidUpdate - globalHistory. */
    /* Listens to change in location and handles multiple actions when there is a location change on hash value only. */
    /* Will scroll property element into view, after input is cleared and search menu is closed. */
    /* Facilitiates scroll action to property, when navigating to a property within the same schema, after navigation action is complete. */
    /* Navigation away from the current schema does not require this action due to unmounting and remounting of the component. */
    useEffect(() => {

        return globalHistory.listen(({location, action}) => {

            const {hash, pathname} = location;
            const [,identifier] = hash.split("#");
            const currentPathName = currentLocation.pathname;

            if ( inputActive && action === "PUSH" && currentPathName === pathname ) {

                /* Close search menu. */
                onHandleSearchClose();

                /* Grab property by identifier. */
                /* Scroll property into view. */
                const propertyEl = document.getElementById(identifier);

                if ( propertyEl ) {

                    propertyEl.scrollIntoView();
                }
            }
        });
    }, [currentLocation, inputActive, onHandleSearchClose]);

    return useMemo(() => {
        return (
            <>
            <span className={compStyles.searchBar}>
            <input className={compStyles.input}
                   placeholder={"Search all metadata"}
                   ref={inputRef}
                   type="text"
                   value={inputText}
                   onChange={(e) => onHandleChange(e)}
                   onFocus={onHandleSearchOpen}/>
                <MetadataSearchInputClear showClear={showClear} onHandleClearInput={onHandleClearInput}/>
            </span>
            {inputActive ? <div className={compStyles.overlay} onClick={onHandleSearchClose} role="presentation"/> : null}
            </>
        )
    }, [inputActive, inputText, showClear, onHandleClearInput, onHandleSearchClose, onHandleSearchOpen]);
}

export default MetadataSearchInput;
