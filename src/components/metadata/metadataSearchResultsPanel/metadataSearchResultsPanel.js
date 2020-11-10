/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search results panel component.
 */

// Core dependencies
import React, {useCallback, useEffect, useRef, useState} from "react";

// Styles
import compStyles from "./metadataSearchResultsPanel.module.css";

function MetadataSearchResultsPanel(props) {

    const {children} = props;
    const panelRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState(0);

    const getPanelMaxHeight = () => {

        /* Find the top position of the panel and calculate maximum possible display height. */
        const panelY0 = panelRef.current.getBoundingClientRect().top;
        const panelHeight = window.innerHeight - panelY0 + 1; /* 1px for top border. */
        setMaxHeight(panelHeight);
    };

    const handleResize = useCallback(() => {

        getPanelMaxHeight();
    }, []);

    /* useEffect - componentDidMount. */
    useEffect(() => {

        getPanelMaxHeight();
    }, []);

    /* useEffect - componentDidMount/componentWillUnmount. */
    /* Event listeners - resize. */
    useEffect(() => {

        /* Add event listeners. */
        window.addEventListener("resize", handleResize);

        return() => {

            /* Remove event listeners. */
            window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    return (
        <div className={compStyles.panel} ref={panelRef} style={{maxHeight: `${maxHeight}px`}}>{children}</div>
    )
}

export default MetadataSearchResultsPanel;
