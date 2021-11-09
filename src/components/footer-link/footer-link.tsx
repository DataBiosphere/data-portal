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
import { button, link as footerLink } from "./footer-link.module.css";
import { bgDark, s } from "../../styles/fontsize.module.css";

interface Props {
  clickFn?: () => {};
  name: string;
  path: string;
}

class FooterLink extends React.Component<Props> {
  render() {
    const { clickFn, name, path } = this.props;
    return (
      <>
        {clickFn ? (
          <button className={button} onClick={clickFn}>
            {name}
          </button>
        ) : (
          <Link to={path} className={classNames(bgDark, footerLink, s)}>
            {name}
          </Link>
        )}
      </>
    );
  }
}

export default FooterLink;
