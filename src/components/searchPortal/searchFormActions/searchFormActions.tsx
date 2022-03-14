/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search form actions component.
 */

// Core dependencies
import classNames from "classnames"; // classname helper
import React from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import Button from "../../button/button";
import SearchInputClear, {
  OnClearInputFn,
} from "../searchInputClear/searchInputClear";

// Styles
import {
  actions,
  apply,
  lungmap as darkTheme,
} from "./searchFormActions.module.css";
import {
  opacityEnter,
  opacityEnterActive,
  opacityExit,
  opacityExitActive,
} from "../../ui/transition/opacity.module.css";

interface Props {
  lungmap: boolean;
  onClearInput: OnClearInputFn;
  showClearButton: boolean;
}

export default function SearchFormActions({
  lungmap,
  onClearInput,
  showClearButton,
}: Props): JSX.Element {
  const classNamesTransition = {
    enter: opacityEnter,
    enterActive: opacityEnterActive,
    exit: opacityExit,
    exitActive: opacityExitActive,
  };
  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={showClearButton}
      timeout={400}
      unmountOnExit
    >
      <div
        className={classNames(actions, { [darkTheme]: lungmap })}
        tabIndex={-1}
      >
        <SearchInputClear lungmap={lungmap} onClearInput={onClearInput} />
        <Button type="submit">
          <span className={apply}>Go</span>
        </Button>
      </div>
    </CSSTransition>
  );
}
