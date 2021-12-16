/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search bar input clear component.
 */

// Core dependencies
import React from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";
import Color from "../../ui/color/color";

// Styles
import { searchClear } from "./searchInputClear.module.css";
import {
  opacityEnter,
  opacityEnterActive,
  opacityExit,
  opacityExitActive,
} from "../../ui/transition/opacity.module.css";

interface Props {
  lungmap: boolean;
  showClearButton: boolean;
}

export default function SearchInputClear({
  lungmap,
  showClearButton,
}: Props): JSX.Element {
  const iconColor = lungmap ? Color.WHITE : Color.GRAY_LIGHT;
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
      <span className={searchClear}>
        <Button color={iconColor}>
          <Icon fontSize={20}>close</Icon>
        </Button>
      </span>
    </CSSTransition>
  );
}
