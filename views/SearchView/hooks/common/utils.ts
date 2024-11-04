import { CardProps } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import { SEARCH_PARAMETERS } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Actions/components/Search/components/SearchBar/common/constants";
import { ReadonlyURLSearchParams } from "next/navigation";
import { SEARCH_CATEGORY } from "../../common/constants";
import {
  SEARCH_ENGINE_PARAMETERS,
  SEARCH_ENGINE_PARAMETER_ID,
  SEARCH_ENGINE_PARAMETER_SAFE,
  SEARCH_ENGINE_PATH,
} from "./constants";
import {
  SearchPagination,
  SearchResponse,
  SearchResponseError,
} from "./entities";

/**
 * Returns request parameters for configured search engine.
 * @param searchParams - Search query and category parameters.
 * @param searchIndex - Search index (start index).
 * @returns url search parameters.
 */
function getRequestParams(
  searchParams: ReadonlyURLSearchParams,
  searchIndex: number
): URLSearchParams {
  const requestParams = new URLSearchParams();
  requestParams.set(SEARCH_ENGINE_PARAMETERS.ID, SEARCH_ENGINE_PARAMETER_ID);
  requestParams.set(
    SEARCH_ENGINE_PARAMETERS.QUERY,
    getRequestParamValue(searchParams)
  );
  requestParams.set(
    SEARCH_ENGINE_PARAMETERS.SAFE,
    SEARCH_ENGINE_PARAMETER_SAFE
  );
  requestParams.set(SEARCH_ENGINE_PARAMETERS.START, searchIndex.toString());
  return requestParams;
}

/**
 * Returns query parameter value for the given search string and selected category.
 * @param searchParams - Search query and category parameters.
 * @returns query parameter value.
 */
function getRequestParamValue(searchParams: ReadonlyURLSearchParams): string {
  const categoryValue = getSearchParamValue(
    searchParams,
    SEARCH_PARAMETERS.CATEGORY
  );
  const qValue = getSearchParamValue(
    searchParams,
    SEARCH_PARAMETERS.QUERY
  ) as string; // Type assertion is safe because hasSearchParamValue ensures the search parameter "q" value is valid.
  if (!categoryValue) return qValue;
  return `${qValue} more:${categoryValue}`;
}

/**
 * Returns request URL for configured search engine.
 * @param requestURL - Request URL origin.
 * @param searchParams - Search query and category parameters.
 * @param searchIndex - Search index (start index).
 * @returns request URL.
 */
export function getRequestURL(
  requestURL: string,
  searchParams: ReadonlyURLSearchParams | null,
  searchIndex: number
): string | undefined {
  if (!searchParams) return;
  if (hasSearchParamValue(searchParams, SEARCH_PARAMETERS.QUERY)) {
    return `${requestURL}${SEARCH_ENGINE_PATH}?${getRequestParams(
      searchParams,
      searchIndex
    ).toString()}`;
  }
}

/**
 * Returns search params from the given path.
 * @param asPath - Current path.
 * @returns search params.
 */
function getSearchParams(asPath: string): URLSearchParams {
  const [, params] = asPath.split("?");
  if (!params) return new URLSearchParams();
  return new URLSearchParams(params);
}

/**
 * Returns the given search parameter value.
 * @param searchParams - Search parameters.
 * @param parameter - Parameter.
 * @returns search parameter value.
 */
function getSearchParamValue(
  searchParams: null | ReadonlyURLSearchParams | URLSearchParams,
  parameter: string
): string | undefined {
  const value = searchParams?.get(parameter);
  return trimSearchParamValue(value);
}

/**
 * Returns true, if the search parameter value is defined.
 * @param searchParams - Search parameters.
 * @param parameter - Parameter.
 * @returns true if the search parameter value is defined.
 */
export function hasSearchParamValue(
  searchParams: null | ReadonlyURLSearchParams | URLSearchParams,
  parameter: string
): boolean {
  return Boolean(getSearchParamValue(searchParams, parameter));
}

/**
 * Returns category from the current path.
 * @param asPath - Current path.
 * @returns category.
 */
export function initCategory(asPath: string): SEARCH_CATEGORY | null {
  const categoryValue = getSearchParamValue(
    getSearchParams(asPath),
    SEARCH_PARAMETERS.CATEGORY
  );
  if (isCategory(categoryValue)) {
    return categoryValue;
  }
  return null;
}

/**
 * Returns true, if the value is SEARCH_CATEGORY.
 * @param value - Value.
 * @returns true if the value is SEARCH_CATEGORY.
 */
export function isCategory(value: unknown): value is SEARCH_CATEGORY {
  return Object.values(SEARCH_CATEGORY).includes(value as SEARCH_CATEGORY);
}

/**
 * Returns true, if the search request is valid.
 * @param asPath - Current path.
 * @returns true if the search request is valid.
 */
export function isRequestValid(asPath: string): boolean {
  return hasSearchParamValue(getSearchParams(asPath), SEARCH_PARAMETERS.QUERY);
}

/**
 * Maps search response to displayable FE pagination format.
 * @param response - Search response.
 * @returns search pagination results.
 */
export function mapSearchPagination(
  response?: SearchResponse | SearchResponseError
): SearchPagination | undefined {
  if (!response) return;
  if ("error" in response) return;
  const { queries } = response;
  const { nextPage, previousPage, request } = queries;
  if (!request[0].totalResults) return;
  return {
    nextPage: nextPage?.[0].startIndex || 0,
    previousPage: previousPage?.[0].startIndex || 0,
  };
}

/**
 * Maps search results to displayable FE format.
 * @param response - Search response.
 * @returns search results.
 */
export function mapSearchResults(
  response?: SearchResponse | SearchResponseError
): CardProps[] | undefined {
  if (!response) return;
  if ("error" in response) return;
  return response.items?.map(({ formattedUrl, link, snippet, title }) => ({
    cardUrl: link,
    secondaryTitle: formattedUrl,
    text: snippet,
    title: title,
  }));
}

/**
 * Trims and removes extra spaces from the search parameter value.
 * @param value - Search term.
 * @returns trimmed search parameter value.
 */
export function trimSearchParamValue(
  value: null | string | undefined
): string | undefined {
  if (!value) return;
  return value.trim().replace(/\s+/g, " ");
}
