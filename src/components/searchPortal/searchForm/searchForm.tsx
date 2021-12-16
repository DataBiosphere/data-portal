/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search form component.
 */

// Core dependencies
import { navigate } from "gatsby";
import React, { FormEvent } from "react";

// App dependencies
import { ToggleSearchBarFn } from "../searchBar/searchBar";
import SearchInput from "../searchInput/searchInput";
import { buildSearchPortalUrl } from "../searchPortal";

// Styles
import { form } from "./searchForm.module.css";

interface Props {
  lungmap: boolean;
  searchBarOpen: boolean;
  searchPartner: string;
  searchTerms: string;
  toggleSearchBar: ToggleSearchBarFn;
}

export default function SearchForm({
  lungmap,
  searchBarOpen,
  searchPartner,
  searchTerms,
  toggleSearchBar,
}: Props): JSX.Element {
  return (
    <form
      autoComplete="off"
      className={form}
      onSubmit={(formEvent) =>
        onSubmitSearchPortal(formEvent, searchPartner, toggleSearchBar)
      }
    >
      <SearchInput
        lungmap={lungmap}
        searchBarOpen={searchBarOpen}
        searchTerms={searchTerms}
        toggleSearchBar={toggleSearchBar}
      />
    </form>
  );
}

/**
 * Navigates to search page with search params terms and selected partner.
 * @param formEvent
 * @param searchPartner
 * @param toggleSearchBar
 */
function onSubmitSearchPortal(
  formEvent: FormEvent<HTMLFormElement>,
  searchPartner: string,
  toggleSearchBar: ToggleSearchBarFn
): void {
  formEvent.preventDefault();
  /* Submit form with valid search terms. */
  const newTerms = formEvent.currentTarget.searchPortal.value;
  if (newTerms) {
    /* Close search bar. */
    toggleSearchBar(false);
    /* Navigate to search page with params. */
    const href = buildSearchPortalUrl(newTerms, searchPartner);
    navigate(href, { state: { searchPage: 1 } });
  }
}
