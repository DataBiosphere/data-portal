/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal footer link component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Styles
import { button, link as footerLink } from "./footer-link.module.css";

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
          <Link to={path} className={footerLink}>
            {name}
          </Link>
        )}
      </>
    );
  }
}

export default FooterLink;
