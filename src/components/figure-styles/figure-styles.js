/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal figure styles component.
 * Provides additional styles to any markdown image i.e. removes the box shadow or specifies a max width.
 * Use of this component within markdown is possible.
 *
 * Children
 * --------
 * Children should have the following format:
 * ![HCA Overview](/_images/hca-overview.png)
 *
 * For example,
 * <figure-styles shadowless=true width="500">
 *
 * ![HCA Overview](/_images/hca-overview.png)
 *
 * </figure-styles>
 *
 * Or for example when using inside a list element,
 * - exploring HCA browser
 *   <figure-styles shadowless=true width="680">
 *   ![Exploring HCA Browser](_images/hca-explore-browser.png)
 *   </figure-styles>
 * - exploring HCA portal
 *
 * Props
 * -----
 * - shadowless: a true value will remove the box shadow style applied to the image container.
 * - width: a numerical string value used to specify the max width for the image container.
 */

// Core dependencies
import React, { useCallback, useEffect, useRef } from "react";

function FigureStyles(props) {
  const { children, shadowless, width } = props;
  const refFigure = useRef(null);
  const figureEl = children?.filter(child => child?.type); // Filter for React Elements.
  const figureExists = figureEl && figureEl.length > 0;

  const getComponentStyles = useCallback(() => {
    /* Handles rehype shadowless prop boolean value. */
    const removeBoxShadow = shadowless ? JSON.parse(shadowless) : false;

    /* Build the new component styles. */
    const styleBoxShadow = removeBoxShadow ? "box-shadow: none;" : null;
    const styleMaxWidth = width ? `max-width: ${width}px;` : null;
    const styles = Array.from([]);

    /* Add new box shadow style. */
    if (styleBoxShadow) {
      styles.push(styleBoxShadow);
    }

    /* Add new max width style. */
    if (styleMaxWidth) {
      styles.push(styleMaxWidth);
    }

    return styles.join(" ");
  }, [shadowless, width]);

  const getGatsbyRespImageWrapperEl = () => {
    const el = refFigure.current;

    if (el?.classList.contains("gatsby-resp-image-wrapper")) {
      return el;
    }

    return el?.querySelector(".gatsby-resp-image-wrapper");
  };

  const getGatsbyRespImageWrapperStyles = useCallback(
    el => {
      const wrapperStyles = el.getAttribute("style");
      const componentStyles = getComponentStyles();

      return wrapperStyles.concat(componentStyles);
    },
    [getComponentStyles]
  );

  const mergeStyles = useCallback(() => {
    /* Grab the <span> element with classname gatsby-resp-image-wrapper. */
    const el = getGatsbyRespImageWrapperEl();

    if (el) {
      const styles = getGatsbyRespImageWrapperStyles(el);
      el.setAttribute("style", styles);
    }
  }, [getGatsbyRespImageWrapperStyles]);

  /* useEffect - componentDidMount/componentWillUnmount. */
  useEffect(() => {
    /* Merge styles. */
    mergeStyles();
  }, [mergeStyles]);

  return figureExists ? (
    React.Children.map(figureEl, figEl =>
      React.cloneElement(figEl, { ref: refFigure })
    )
  ) : (
    <p>** Image Render Error **</p>
  );
}

export default FigureStyles;
