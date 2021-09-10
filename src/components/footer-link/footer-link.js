/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer link component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./footer-link.module.css";
import * as fontStyles from "../../styles/fontsize.module.css";

class FooterLink extends React.Component {
  render() {
    const { link } = this.props,
      { clickFn, name, path } = link || {};
    const footerLinkClassName = classNames(
      fontStyles.bgDark,
      compStyles.link,
      fontStyles.s
    );
    return (
      <>
        {clickFn ? (
          <button className={compStyles.button} onClick={clickFn}>
            {name}
          </button>
        ) : (
          <Link to={path} className={footerLinkClassName}>
            {name}
          </Link>
        )}
      </>
    );
  }
}

export default FooterLink;
