/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search input component.
 */

// Core dependencies
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";

// App dependencies
import ContextMetadataSearch from "../contextMetadataSearch/contextMetadataSearch";

// Styles
import compStyles from "./metadataSearchInput.module.css";

let classNames = require("classnames");

function MetadataSearchInput() {

    const {inputActive, inputValue, onHandleEsc, onHandleInput} = useContext(ContextMetadataSearch);
    const inputRef = useRef();
    const [inputFocused, setInputFocused] = useState(false);
    const [inputText, setInputText] = useState(inputValue);
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

    /* useEffect - componentDidUpdate - inputValue. */
    /* Handles initialization of inputText from URL. */
    useEffect(() => {

        setTimer(500);
        setInputText(inputValue);
    }, [inputValue]);

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

    const onHandleChange = (event) => {

        const inputText = event.target.value;

        setTimer(500);
        setInputText(inputText);
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
                <span className={classNames(compStyles.icon, "material-icons", {[compStyles.active]: showClear})}
                      role="presentation"
                      onClick={onHandleClearInput}>close</span>
            </span>
            {inputFocused ? <div className={compStyles.overlay} onClick={onHandleClearInput} role="presentation"/> : null}
            </>
        )
    }, [inputFocused, inputText, showClear]);
}

export default MetadataSearchInput;
