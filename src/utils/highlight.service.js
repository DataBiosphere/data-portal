/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating highlight component.
 */

/**
 * Inserts <mark> tags, when required, within the specified ref object.
 * Looks for a term match on the innerHTML of any "text" <span> tags.
 * Rewrites the innerHTML with <mark> tags wrapped around the term match.
 *
 * @param highlightRef
 * @param regex
 */
export function insertMarks(highlightRef, regex) {

    /* Grab all <span> nodes. */
    const spanNodes = highlightRef.current.querySelectorAll("span");

    /* Filter <span> nodes; keep only non-nested <span> tags. */
    const filteredSpanNodes = [...spanNodes].filter(spanEl => {

        const {childNodes} = spanEl;
        return childNodes.length === 1 && !childNodes[0].tagName;
    });

    /* Insert the <mark> tag around search terms. */
    if ( filteredSpanNodes ) {

        filteredSpanNodes.forEach(span => {

            span.innerHTML = span.innerHTML.replace(regex, `<mark>$1</mark>`);
        });
    }
}

/**
 * Strips <mark> tags from specified ref object.
 * Returns the ref object back to its original DOM element.
 *
 * @param highlightRef
 */
export function stripMarks(highlightRef) {

    /* Grab all <mark> nodes. */
    const markNodes = highlightRef.current.querySelectorAll("mark");

    /* Remove the <mark> tag; replaces outer html with outer text. */
    if ( markNodes ) {

        [...markNodes].forEach(markEl => {

            markEl.outerHTML = markEl.outerText;
        })
    }
}
