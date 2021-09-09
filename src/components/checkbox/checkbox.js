/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal - checkbox component.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./checkbox.module.css";

class Checkbox extends React.Component {
  render() {
    const { checked, clickAction, count, disabled, label } = this.props;
    const classNamesCheckbox = classNames(
      { [compStyles.active]: checked },
      compStyles.checkbox,
      { [compStyles.disabled]: disabled }
    );
    return (
      <span
        className={classNamesCheckbox}
        onClick={clickAction}
        role="presentation"
      >
        <span className={compStyles.check}>
          <span className={classNames("material-icons", compStyles.icon)}>
            done
          </span>
        </span>
        <span className={compStyles.label}>{label}</span>
        {count ? <span className={compStyles.count}>{count}</span> : null}
      </span>
    );
  }
}

export default Checkbox;
