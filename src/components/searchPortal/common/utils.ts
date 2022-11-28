import { navigate } from "gatsby";
import { FormEvent } from "react";
import { UrlSearchParams } from "./entities";

/**
 * Builds site search url with corresponding search string and search partner params.
 * @param searchStr - Search string.
 * @param searchPath - Configured search path.
 * @param searchPartner - Search partner.
 */
export function buildSiteSearchUrl(
  searchStr: string,
  searchPath: string,
  searchPartner?: string
): string {
  /* Set the search params. */
  const params = new URLSearchParams();
  params.set("q", searchStr);

  /* Set the selected partner params. */
  if (searchPartner) {
    params.set("partner", searchPartner);
  }

  /* Return url with params. */
  return `${searchPath}?${params.toString()}`;
}

/**
 * Navigates to site search page with updated partner in the params.
 * @param searchStr - Search string.
 * @param searchPath - Configured search path.
 * @param searchPartner - Search partner.
 */
export function onSelectSiteSearchPartner(
  searchStr: string,
  searchPath: string,
  searchPartner: string
) {
  if (searchStr) {
    /* Navigate to search page with params. */
    const href = buildSiteSearchUrl(searchStr, searchPath, searchPartner);
    navigate(href);
  }
}

/**
 * Navigates to site search page with search string in the params.
 * @param formEvent - Form event when form is submitted.
 * @param searchStr - Search string.
 * @param searchPath - Configured search path.
 */
export function onSubmitSiteSearch(
  formEvent: FormEvent<HTMLFormElement>,
  searchStr: string,
  searchPath: string
) {
  formEvent.preventDefault();

  /* Only submit form if query is valid. */
  if (searchStr) {
    /* Navigate to search page with params. */
    const href = buildSiteSearchUrl(searchStr, searchPath);
    navigate(href);
  }
}

/**
 * Returns the url search params search term and search partner from current location.
 * @param search - Location search.
 * @returns Tuple containing search term and search partner.
 */
export function partitionSearchParams(search: string): UrlSearchParams {
  /* Get the search params from the current URL search params. */
  const params = new URLSearchParams(search);
  const newTerms = params.get("q") || "";
  const newPartner = params.get("partner") || "";
  return [newTerms, newPartner];
}
