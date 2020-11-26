/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search input component.
 */

// Core dependencies
import { globalHistory, useLocation } from "@reach/router";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";
import MetadataSearchInputClear from "../metadataSearchInputClear/metadataSearchInputClear";

// Styles
import compStyles from "./metadataSearchInput.module.css";

function MetadataSearchInput() {

    const {inputActive, onHandleSearch, onHandleSearchClose, onHandleSearchOpen} = useContext(ContextMetadataSearch);
    const currentLocation = useLocation();
    const delaySearchRef = useRef(0);
    const inputRef = useRef(null);
    const [showClear, setShowClear] = useState(false);
    const timer = 500;

    const onHandleChange = () => {

        /* Clear any previously set timeout. */
        if ( delaySearchRef.current ) {

            clearTimeout(delaySearchRef.current);
        }

        /* Delay search over entities - improves indexing/search performance. */
        delaySearchRef.current = setTimeout(() => {

            onHandleSearch(inputRef.current.value);
        }, timer);
        return () => clearTimeout(delaySearchRef.current);
    };

    const onHandleClearInput = useCallback(() => {

        /* Maintain <input> focus. */
        /* Set timerRef to zero and clear the inputRef value. */
        inputRef.current.focus();
        inputRef.current.value = "";
        onHandleSearch("");
    }, [onHandleSearch]);

    const onHandleKeyDown = useCallback((keyEvent) => {

        const {key} = keyEvent;

        /* Key arrow up - prevent default. */
        /* Prevent changes to input cursor position when keying up/down in results panel. */
        if ( key === "ArrowUp" ) {

            keyEvent.preventDefault();
        }

        if ( key === "Escape" ) {

            onHandleSearchClose();
        }
    }, [onHandleSearchClose]);

    const onHandleLocationChange = useCallback((location, action) => {

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

    }, [currentLocation, inputActive, onHandleSearchClose]);

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
    /* Handles external control of focus changes to the <input> and changes to clear button 'x'. */
    useEffect(() => {

        if ( !inputActive ) {

            inputRef.current.blur();
            inputRef.current.value = "";
            setShowClear(false);
        }
        else {

            setShowClear(true);
        }
    }, [inputActive]);

    /* useEffect - componentDidUpdate - globalHistory. */
    /* Listens to change in location and handles multiple actions when there is a location change on hash value only. */
    /* Will scroll property element into view, after input is cleared and search menu is closed. */
    /* Facilitates scroll action to property, when navigating to a property within the same schema, after navigation action is complete. */
    /* Navigation away from the current schema does not require this action due to unmounting and mounting of the component. */
    useEffect(() => {

        return globalHistory.listen(({location, action}) => {

            onHandleLocationChange(location, action);
        });
    }, [onHandleLocationChange]);

    return (
        <>
        <span className={compStyles.searchBar}>
        <input className={compStyles.input}
               placeholder={"Search all metadata"}
               ref={inputRef}
               type="text"
               onChange={() => onHandleChange()}
               onFocus={onHandleSearchOpen}/>
            <MetadataSearchInputClear showClear={showClear} onHandleClearInput={onHandleClearInput}/>
        </span>
        {inputActive ? <div className={compStyles.overlay} onClick={onHandleSearchClose} role="presentation"/> : null}
        </>
    )
}

export default React.memo(MetadataSearchInput);
