/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal provider metadata displaying component.
 */

// Core dependencies
import {navigate} from "gatsby";
import React, {useCallback, useEffect, useRef, useState} from "react";

// App dependencies
import ContextMetadataDisplaying from "../contextMetadataDisplaying/contextMetadataDisplaying";

function ProviderMetadataDisplaying(props) {

    const {children} = props;
    const highlightTimerRef = useRef(0);
    const [highlight, setHighlight] = useState({active: false, value: ""});
    const [showAllMetadata, setShowAllMetadata] = useState(true);
    const {active, value} = highlight;

    const getLocalStorageValues = () => {

        /* Grab the local storage values. */
        /* Note, returned value from local storage is a string. */
        const highlightActive = localStorage.getItem("highlightActive") === "true";
        const highlightValue = localStorage.getItem("highlightValue");
        const showEntireMetadata = localStorage.getItem("showMetadata") === "true";

        setHighlight({active: highlightActive, value: highlightValue});
        setShowAllMetadata(showEntireMetadata);
    };

    const onUpdateHighlight = useCallback(() => {

        /* Clear any previously set timeout. */
        if ( highlightTimerRef.current ) {

            clearTimeout(highlightTimerRef.current);
        }

        /* Set and maintain highlight for a period, and then clear the highlight. */
        highlightTimerRef.current = setTimeout(() => {

            setHighlight({active: false, value: ""});
        }, 10000);
        return () => clearTimeout(highlightTimerRef.current);
    }, []);

    const onHandleNavigationHit = (result) => {

        const {primaryRequired, required, type, urlTo} = result || {};
        const toggleMetadata = !showAllMetadata && /property/.test(type) && !(required && primaryRequired);

        /* Toggle required fields "Show required fields only". */
        /* If the result is a property, and the property is not required. */
        /* Then set showAllMetadata to true to ensure the result is viewable. */
        if ( toggleMetadata ) {

            setShowAllMetadata(true);
        }

        /* Handle the display of highlight on search hit result page. */
        onHandleSearchHit(urlTo);

        /* Navigate. */
        navigate(urlTo);
    };

    const onHandleSearchHit = (urlTo) => {

        setHighlight({active: true, value: urlTo});
    };

    const onHandleToggleRequiredFields = () => {

        setShowAllMetadata(showAllMetadata => !showAllMetadata);
    };

    const setLocalStorageValues = useCallback(() => {

        /* Set the local storage values. */
        localStorage.setItem("highlightActive", active);
        localStorage.setItem("highlightValue", value);
        localStorage.setItem("showMetadata", showAllMetadata);
    }, [active, value, showAllMetadata]);

    /* useEffect - componentDidMount. */
    useEffect(() => {

        /* Get the local storage values. */
        getLocalStorageValues();
    }, []);

    /* useEffect - componentWillUnmount. */
    useEffect(() => {

        return() => {

            /* Clear timeout. */
            clearTimeout(highlightTimerRef.current);
        }
    }, []);

    /* useEffect - componentDidUpdate. */
    useEffect(() => {

        /* Set local storage values. */
        setLocalStorageValues();
    }, [setLocalStorageValues]);

    useEffect(() => {

        /* Update highlight. */
        onUpdateHighlight();
    }, [onUpdateHighlight]);

    return (
        <ContextMetadataDisplaying.Provider value={{highlightActive: active, highlightValue: value, showAllMetadata, onHandleNavigationHit, onHandleToggleRequiredFields}}>
            {children}
        </ContextMetadataDisplaying.Provider>
    )
}

export default ProviderMetadataDisplaying;
