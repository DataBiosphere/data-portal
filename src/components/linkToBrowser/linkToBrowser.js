/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal link to browser component.
 * Links from portal to browser; maintaining the correct environment.
 *
 * Use of this component within markdown is possible.
 * Use the tag <link-to-browser relativelink="insert-browser-relative-link">markdown text</link-to-browser> but ensure it is closed.
 *
 * The prop "relativelink" (note, all lowercase) is required and should be the *browser* relative link.
 *
 */

// Core dependencies
import React from "react";

class LinkToBrowser extends React.Component {
  trimRelativeLink = () => {
    const { relativelink } = this.props;

    if (relativelink.startsWith("/")) {
      return relativelink.slice(1);
    }

    return relativelink;
  };

  render() {
    const { children } = this.props;
    return (
      <a
        href={`${process.env.GATSBY_EXPLORE_URL}${this.trimRelativeLink()}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
}

export default LinkToBrowser;
