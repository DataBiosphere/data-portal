/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal content wrapper component.
 * Provides styles that mirror content padding/margins in the absence of navigation or toc.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./contentWrapper.module.css";

function ContentWrapper(props) {
  const { children, marginLeft, marginRight } = props;

  return (
    <div
      className={classNames(
        compStyles.contentWrapper,
        { [compStyles.mLeft]: marginLeft },
        { [compStyles.mRight]: marginRight }
      )}
    >
      {children}
    </div>
  );
}

export default ContentWrapper;
