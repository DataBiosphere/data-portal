/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal tab component.
 */

// Core dependencies
import { Link } from "gatsby";
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./tab.module.css";

class Tab extends React.Component {
  render() {
    const { back, secondary, tab } = this.props,
      { active, name, path } = tab || {};
    const classNamesTab = classNames(
      { [compStyles.active]: active },
      { [compStyles.back]: back },
      { [compStyles.secondary]: secondary },
      compStyles.tab
    );
    return path ? (
      <div className={classNamesTab} data-testid={name ? "tab" : undefined}>
        {back ? <i className="material-icons">keyboard_arrow_left</i> : null}
        {back ? <a href={path}>{name}</a> : <Link to={path}>{name}</Link>}
      </div>
    ) : null;
  }
}

export default Tab;
