/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal section component.
 */

// Core dependencies
import React from "react";

// Styles
import * as compStyles from "./section.module.css";
import * as fontStyles from "../../styles/fontsize.module.css";
import * as globalStyles from "../../styles/global.module.css";

class Section extends React.Component {
  render() {
    const { section, sectionTitle } = this.props,
      { name } = section || {};
    const sectionName = name ? name : sectionTitle;
    return (
      <div className={compStyles.hcaSection}>
        <div className={globalStyles.wrapper}>
          <div className={fontStyles.xxl}>{sectionName}</div>
        </div>
      </div>
    );
  }
}

export default Section;
