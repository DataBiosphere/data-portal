/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal highlight component.
 * Highlights any text matching the specified term.
 */

// Core dependencies
import React, {useEffect, useRef, useState} from "react";

// App dependencies
import * as HighlightService from "../../utils/highlight.service";
import * as MetadataSearchService from "../../utils/metadata-search.service";

// Styles
import compStyles from "./highlight.module.css";

function Highlight(props) {

    const {children, term} = props;
    const highlightRef = useRef();
    const [termRegex, setTermRegex] = useState();
    const markRegex = /<mark>(.*?)<\/mark>/gi;

    /* useEffect - componentDidUpdate - term. */
    /* Handles changes on term. */
    useEffect(() => {

        if ( term ) {

            const regex = MetadataSearchService.onHandleSpecialChars(term)
                .trim()
                .split(/[.|_\s]/g)
                .filter(term => !!term)
                .join("|");

            setTermRegex(new RegExp(`(${regex})`, "gi"));
        }
    }, [term]);

    /* useEffect - componentDidUpdate - regex. */
    /* Handles changes on regex. */
    useEffect(() => {

        /* Remove any existing marks. */
        HighlightService.removeMarks(highlightRef, markRegex);

        /* Add marks. */
        HighlightService.addMarks(highlightRef, termRegex);
    }, [markRegex, termRegex]);

    return (
        <span className={compStyles.highlight} ref={highlightRef}>{children}</span>
    );
}

export default Highlight;
