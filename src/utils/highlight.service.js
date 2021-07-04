/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating highlight component.
 */

/**
 * Adds <mark> tags, where required, within the specified ref object.
 * Looks for a term match on the innerHTML of any tags (<div>, <p>, <span>) containing text only.
 * Rewrites the innerHTML with <mark> tags wrapped around the text that matches the term.
 *
 * @param highlightRef
 * @param regex
 */
export function addMarks(highlightRef, regex) {
  if (highlightRef && regex) {
    /* Grab all <div>, <p> and <span> nodes. */
    const contentNodes = highlightRef.current.querySelectorAll("div, p, span");

    /* Filter nodes; keep only non-nested tags - where the childNode has no "tagName". */
    const filteredNodes = [...contentNodes].filter(spanEl => {
      const { childNodes } = spanEl;
      return childNodes.length === 1 && !childNodes[0].tagName;
    });

    /* Insert the <mark> tag around search terms. */
    if (filteredNodes) {
      filteredNodes.forEach(node => {
        node.innerHTML = node.innerHTML.replace(regex, `<mark>$1</mark>`);
      });
    }
  }
}

/**
 * Removes <mark> tags from specified ref object.
 * Returns the ref object back to its original DOM element sans mark up.
 *
 * @param highlightRef
 * @param regex
 */
export function removeMarks(highlightRef, regex) {
  if (highlightRef && regex) {
    const markNodes = highlightRef.current.querySelectorAll("mark");

    if (markNodes) {
      /* Grab a set of parent elements for all mark nodes. */
      const setOfParentElements = new Set();

      markNodes.forEach(markNode => {
        setOfParentElements.add(markNode.parentElement);
      });

      /* For each parent element, replace the inner HTML with text content. */
      /* Removes any <mark> tags from the element, returning it to its original text content. */
      /* e.g. element inner HTML such as "The <mark>typ</mark>e of cell line." returns "The type of cell line.". */
      [...setOfParentElements].forEach(parentNode => {
        parentNode.innerHTML = parentNode.textContent;
      });
    }
  }
}
