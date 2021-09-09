/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal TOC item component.
 */

// Core dependencies
import { navigate } from "gatsby";
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as fontStyles from "../../styles/fontsize.module.css";
import * as compStyles from "./tocItem.module.css";

class TOCItem extends React.Component {
  isTOCActive = () => {
    const { activeLocation = {}, toc } = this.props;
    const { anchor, type } = toc;

    /* Handle case for markdown TOC. */
    if (/docs/.test(type)) {
      return activeLocation.hash === anchor;
    } else {
      /* Handle case for metadata TOC. */
      const [toc0] = activeLocation.hash.split("-");
      const [toc1] = anchor.split("-");

      return toc0 === toc1;
    }
  };

  onTOCClicked = anchor => {
    navigate(anchor);
  };

  render() {
    const { toc } = this.props;
    const { anchor, depth, name } = toc;
    const classTOCLink = classNames(
      { [compStyles.depth3]: depth === 3 },
      fontStyles.xs
    );
    const classTOCItem = classNames(
      { [compStyles.active]: this.isTOCActive() },
      compStyles.toc
    );
    return (
      <li className={classTOCItem}>
        <button
          aria-label={name}
          className={classTOCLink}
          onClick={() => this.onTOCClicked(anchor)}
        >
          {name}
        </button>
      </li>
    );
  }
}

export default TOCItem;
