/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata search input clear button wrapper component.
 * Clears text in search <input>.
 */

// Core dependencies
import React from "react";
import { CSSTransition } from "react-transition-group";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";
import Color from "../../ui/color/color";

// Styles
import { searchClear } from "./metadataSearchInputClear.module.css";
import {
  opacityEnter,
  opacityEnterActive,
  opacityExit,
  opacityExitActive,
} from "../../ui/transition/opacity.module.css";

function MetadataSearchInputClear(props) {
  const { onHandleClearInput, showClear } = props;
  const classNamesTransition = {
    enter: opacityEnter,
    enterActive: opacityEnterActive,
    exit: opacityExit,
    exitActive: opacityExitActive,
  };

  return (
    <CSSTransition
      classNames={classNamesTransition}
      in={showClear}
      timeout={400}
      unmountOnExit
    >
      <span className={searchClear}>
        <Button color={Color.GRAY_LIGHT} onClick={() => onHandleClearInput()}>
          <Icon fontSize={20}>close</Icon>
        </Button>
      </span>
    </CSSTransition>
  );
}

export default React.memo(MetadataSearchInputClear);
