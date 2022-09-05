/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal search pagination component.
 */

// Core dependencies
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

type SiteSearchPageRequestFn = (pageIncrement: number) => void;

interface Props {
  showNextPagination: boolean;
  showPrevPagination: boolean;
  siteSearchPageRequestFn: SiteSearchPageRequestFn;
}

export default function SearchPagination({
  showNextPagination,
  showPrevPagination,
  siteSearchPageRequestFn,
}: Props): JSX.Element {
  return (
    <div className={pagination}>
      <span className={previousPage}>
        <IconButton
          color={Color.PRIMARY}
          disabled={!showPrevPagination}
          onClick={() => siteSearchPageRequestFn(-1)}
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
          onClick={() => siteSearchPageRequestFn(1)}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </span>
    </div>
  );
}
