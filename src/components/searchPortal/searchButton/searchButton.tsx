/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search button component.
 */

// Core dependencies
import React from "react";

// App dependencies
import Button from "../../button/button";
import Icon from "../../icon/icon";
import { ToggleSearchBarFn } from "../searchBar/searchBar";
import Color from "../../ui/color/color";

// Styles
import { searchButton } from "./searchButton.module.css";

interface Props {
  lungmap?: boolean;
  toggleSearchBar: ToggleSearchBarFn;
}

export default function SearchButton({
  lungmap = false,
  toggleSearchBar,
}: Props): JSX.Element {
  const iconColor = lungmap ? Color.WHITE : Color.GRAY_LIGHT;
  return (
    <div className={searchButton}>
      <Button color={iconColor} onClick={() => toggleSearchBar(true)}>
        <Icon>search</Icon>
      </Button>
    </div>
  );
}
