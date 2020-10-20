/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Basic tooltip service.
 */

/**
 * Returns the left and top position for the tooltip, specified by the tooltip target.
 *
 * @param target
 * @returns {{x: number, y: number}}
 */
export function positionTooltip(target, tooltip) {

    // Let "b" represent the "button" that triggers the tooltip to show/hide.
    const b = target.getBoundingClientRect();

    // Let "tt" represent the tooltip.
    const tt = tooltip.current.getBoundingClientRect();

    // Let "m" represent the main content.
    const m = document.getElementsByTagName("main")[0];

    // Let "d" be any distance in pixels from the button.
    const d = 8;

    const scrollYPos = window.scrollY;

    // Grab the tooltip's bounds. We will use this to determine its position.
    // The main content element will be used to calculate the bounds.
    // The bounds for the tooltip are simple:
    // - It may display over any navigation or outline components (it has been provided the full width of the window)
    // - It should not display over the header
    // - It should not display over the footer

    const mX1 = 0; /* left bound */
    const mX2 = window.innerWidth; /* right bound */
    const mY1 = m ? m.offsetTop : 0; /* top bound */
    const mY2 = m ? Math.min(scrollYPos + window.innerHeight, mY1 + m.offsetHeight) - scrollYPos : window.innerHeight; /* bottom bound */

    // Grab the button's dimensions.
    const bX1 = b.left;
    const bX2 = b.right;
    const bY1 = b.top;
    const bY2 = b.bottom;
    const bHeight = b.height;
    const bWidth = b.width;
    const bXMidPoint = ((bWidth) / 2) + bX1;
    const bYMidPoint = ((bHeight) / 2) + bY1;

    // Grab the tooltip's dimensions.
    const ttHeight = tt.height;
    const ttWidth = tt.width;

    // First calculate the tooltip position as if it were displayed above the button.

    // Top position.
    let x = bXMidPoint - (ttWidth / 2);
    let y = bY1 - d - ttHeight; /* 8px above the button */

    // Now check if this position is suitable and change the position if it isn't.
    // Bottom position.
    if ( y < mY1 ) {

        y = bY2 + d; /* 8px below the button */
    }

    // Check position fits within bottom/left/right bounds.
    if ( y > mY2 || x < mX1 || (x + ttWidth) > mX2 ) {

        y = bYMidPoint - (ttHeight / 2); /* Centered */

        // Right position.
        if ( y > mY2 || x < mX1 ) {

            x = bX2 + d; /* 8px to the right of the button */
        }

        // Left position.
        if ( (x + ttWidth) > mX2 ) {

            x = bX1 - d - ttWidth; /* 8px to the left of the button */
        }
    }

    return {
        x: x,
        y: y
    };
}
