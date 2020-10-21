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

// Styles
import compStyles from "./highlight.module.css";

function Highlight(props) {

    const {children, term} = props;
    const highlightRef = useRef();
    const [regex, setRegex] = useState();
    const [termRegex, setTermRegex] = useState();

    /* useEffect - componentDidUpdate - term. */
    /* Handles changes on term. */
    useEffect(() => {

        setTermRegex(term.split(/[.|_\s]/g).join("|"))
    }, [term]);

    /* useEffect - componentDidUpdate - termRegex. */
    /* Handles changes on termRegex. */
    useEffect(() => {

        setRegex(new RegExp(`(${termRegex})`, "gi"));
    }, [termRegex]);

    /* useEffect - componentDidUpdate - regex. */
    /* Handles changes on regex. */
    useEffect(() => {

        /* Strip out any existing marks. */
        HighlightService.stripMarks(highlightRef);

        /* Insert marks. */
        HighlightService.insertMarks(highlightRef, regex);
    }, [regex]);

    return (
        <span className={compStyles.highlight} ref={highlightRef}>{children}</span>
    );
}

export default Highlight;
