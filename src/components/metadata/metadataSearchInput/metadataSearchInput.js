/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search input component.
 */

// Core dependencies
import { globalHistory, useLocation } from "@reach/router";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchInputClear from "../metadataSearchInputClear/metadataSearchInputClear";

// Styles
import compStyles from "./metadataSearchInput.module.css";

function MetadataSearchInput() {

    const {inputActive, onHandleEsc, onHandleInput, onHandleSearchClose} = useContext(ContextMetadataSearch);
    const currentLocation = useLocation();
    const inputRef = useRef();
    const [inputFocused, setInputFocused] = useState(false);
    const [inputText, setInputText] = useState("");
    const [timer, setTimer] = useState(500);
    const showClear = !!inputText;

    /* useEffect - componentDidMount/componentWillUnmount. */
    useEffect(() => {

        /* Allows handling of focus on <input>. */
        inputRef.current = document.querySelector("input");

        /* Add event listener "focus" to <input>. */
        inputRef.current.addEventListener("focus", onHandleFocus, false);

        /* Add event listener "keydown" [escape key] to blur and clear <input>. */
        document.addEventListener("keydown", onHandleEscape, false);

        return () => {

            /* Remove event listeners. */
            document.removeEventListener("focus", onHandleFocus, false);
            document.removeEventListener("keydown", onHandleEscape, false);
        }
    }, []);

    /* useEffect - componentDidUpdate - inputText. */
    /* Handles changes on <input>. */
    useEffect(() => {

        /* Delay search over entities to improve performance on rendering input value. */
        const delaySearch = setTimeout(() => onHandleInput(inputText), timer);
        return () => clearTimeout(delaySearch);
    }, [inputText, onHandleInput, timer]);

    /* useEffect - componentDidUpdate - inputFocused. */
    /* Handles focus changes to the <input>. */
    useEffect(() => {

        onHandleEsc(inputFocused);

        if ( !inputFocused ) {

            /* Clear input. */
            setInputText("");
        }
    }, [inputFocused, onHandleEsc]);

    /* useEffect - componentDidUpdate - inputActive. */
    /* Handles external focus changes to the <input>. */
    /* e.g. selection of search result clears input, and resets provider state inputActive to false. */
    useEffect(() => {

        setInputFocused(inputActive);
    }, [inputActive]);

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

                /* Clear input. */
                onHandleInput("");

                /* Close search menu - allows site to scroll. */
                onHandleEsc(false);

                /* Grab property by identifier. */
                /* Scroll property into view. */
                const propertyEl = document.getElementById(identifier);

                if ( propertyEl ) {

                    propertyEl.scrollIntoView();
                }
            }
        });
    }, [currentLocation, inputActive, onHandleEsc, onHandleInput]);

    const onHandleChange = (event) => {

        const text = event.target.value;

        setTimer(500);
        setInputText(text);
    };

    const onHandleClearInput = () => {

        /* Set timer to zero and set active state to false. */
        setTimer(0);
        setInputFocused(false);
    };

    const onHandleEscape = (e) => {

        if ( e.key === "Escape" ) {

            inputRef.current.blur();
            setInputFocused(false);
        }
    };

    const onHandleFocus = () => {

        setInputFocused(true);
    };

    return useMemo(() => {
        return (
            <>
            <span className={compStyles.searchBar}>
                <input className={compStyles.input}
                       placeholder={"Search all metadata"}
                       type="text"
                       value={inputText}
                       onChange={(e) => onHandleChange(e)}/>
                <MetadataSearchInputClear showClear={showClear} onHandleClearInput={onHandleClearInput}/>
            </span>
            {inputFocused ? <div className={compStyles.overlay} onClick={onHandleSearchClose} role="presentation"/> : null}
            </>
        )
    }, [inputFocused, inputText, showClear, onHandleSearchClose]);
}

export default MetadataSearchInput;
