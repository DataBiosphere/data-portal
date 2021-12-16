/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search bar component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { useLocation } from "@reach/router";
import React from "react";

// App dependencies
import SearchForm from "../searchForm/searchForm";
import { getSearchParams, SearchLocation } from "../searchPortal";

// Styles
import {
  active,
  lungmap as darkTheme,
  searchBar,
} from "./searchBar.module.css";

export type ToggleSearchBarFn = (open: boolean) => void;

interface Props {
  lungmap?: boolean;
  searchBarOpen: boolean;
  toggleSearchBar: ToggleSearchBarFn;
}

export default function SearchBar({
  lungmap = false,
  searchBarOpen,
  toggleSearchBar,
}: Props): JSX.Element {
  const currentLocation = useLocation() as SearchLocation;
  const [searchTerms, searchPartner] = getSearchParams(currentLocation);
  return (
    <div
      className={classNames({ [active]: searchBarOpen }, searchBar, {
        [darkTheme]: lungmap,
      })}
    >
      <SearchForm
        lungmap={lungmap}
        searchBarOpen={searchBarOpen}
        searchPartner={searchPartner}
        searchTerms={searchTerms}
        toggleSearchBar={toggleSearchBar}
      />
    </div>
  );
}
