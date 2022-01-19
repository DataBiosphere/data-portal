/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search bar input clear component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";
import Color from "../../ui/color/color";

// Styles
import { searchClear } from "./searchInputClear.module.css";

interface Props {
  lungmap: boolean;
}

export default function SearchInputClear({ lungmap }: Props): JSX.Element {
  const iconColor = lungmap ? Color.GRAY_LIGHT : Color.GRAY_LIGHT;
  return (
    <span className={searchClear}>
      <Button color={iconColor} type="button">
        <Icon fontSize={20}>close</Icon>
      </Button>
    </span>
  );
}
