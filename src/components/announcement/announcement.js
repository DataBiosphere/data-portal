/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal announcement component, displayed under header.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./announcement.module.css";
import * as fontStyles from "../../styles/fontsize.module.css";

class Announcement extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={compStyles.announcement}>
        <p className={classNames(fontStyles.m, compStyles.announcementContent)}>
          {children}
        </p>
      </div>
    );
  }
}

export default Announcement;
