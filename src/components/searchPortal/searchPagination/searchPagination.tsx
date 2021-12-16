/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search pagination component.
 */

// Core dependencies
import { navigate } from "gatsby";
import React from "react";

// App dependencies
import Icon from "../../icon/icon";
import IconButton from "../../iconButton/iconButton";
import Color from "../../ui/color/color";

// Styles
import {
  nextPage,
  pagination,
  previousPage,
} from "./searchPagination.module.css";

interface Props {
  currentPage: number;
  currentSearchURL: string;
  showNextPagination: boolean;
  showPrevPagination: boolean;
}

export default function SearchPagination({
  currentPage,
  currentSearchURL,
  showNextPagination,
  showPrevPagination,
}: Props): JSX.Element {
  return (
    <div className={pagination}>
      <span className={previousPage}>
        <IconButton
          color={Color.PRIMARY}
          disabled={!showPrevPagination}
          onClick={() =>
            onSearchPortalPageRequest(currentSearchURL, currentPage, -1)
          }
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <span>Previous</span>
      </span>
      <span className={nextPage}>
        <span>Next</span>
        <IconButton
          color={Color.PRIMARY}
          disabled={!showNextPagination}
          onClick={() =>
            onSearchPortalPageRequest(currentSearchURL, currentPage, 1)
          }
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </span>
    </div>
  );
}

/**
 * Request to view next or previous search page.
 * @param currentSearchURL
 * @param currentPage
 * @param pageIncrement
 */
const onSearchPortalPageRequest = (
  currentSearchURL: string,
  currentPage: number,
  pageIncrement: number = 0
): void => {
  /* Calculate the next page request (page 1, 11, 21 etc). */
  const nextIndex = currentPage + pageIncrement * 10;
  /* Navigate to search page with params. */
  navigate(currentSearchURL, { state: { searchPage: nextIndex } });
};
