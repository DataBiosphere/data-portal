/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal button component.
 */

// Core dependencies
import React from "react";

// Class name helper
import classNames from "classnames";

// Styles
import * as compStyles from "./button.module.css";

function Button(props) {
  const { children, clickAction, icon } = props;
  const classNamesButton = classNames(compStyles.button, {
    [compStyles.buttonIcon]: icon,
  });

  const onHandleClickAction = () => {
    if (clickAction) {
      clickAction();
    }
  };

  return (
    <button className={classNamesButton} onClick={() => onHandleClickAction()}>
      {children}
    </button>
  );
}

export default Button;
