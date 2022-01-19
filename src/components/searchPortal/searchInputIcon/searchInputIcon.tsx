/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search input icon component.
 * Wrapper for input search icon.
 */

// Core dependencies
import React from "react";

// App dependencies
import Icon from "../../icon/icon";
import Color from "../../ui/color/color";

// Styles
import { searchIcon } from "./searchInputIcon.module.css";

interface Props {
  lungmap: boolean;
}

export default function SearchInputIcon({ lungmap }: Props): JSX.Element {
  const iconColor = lungmap ? Color.PRIMARY : Color.GRAY_LIGHT;
  return (
    <span className={searchIcon}>
      <Icon color={iconColor} fontSize={20}>
        search
      </Icon>
    </span>
  );
}
