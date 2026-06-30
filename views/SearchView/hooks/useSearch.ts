import { CardProps } from "@databiosphere/findable-ui/lib/components/common/Card/card";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useSiteConfig } from "../../../hooks/useSiteConfig";
import {
  SearchPagination,
  SearchResponse,
  SearchResponseError,
} from "./common/entities";
import {
  getRequestURL,
  getSearchIndex,
  isRequestValid,
  mapSearchPagination,
  mapSearchResults,
} from "./common/utils";
import { useFetchSearch } from "./useFetchSearch";

type Response = SearchResponse | SearchResponseError;

export interface UseSearch {
  isLoading: boolean;
  isSuccess: boolean;
  isValid: boolean;
  pagination?: SearchPagination;
  results?: CardProps[];
}

/**
 * Hook facilitating search functionality and results.
 * Both the search term and the pagination index are derived from the URL, so
 * refresh, deep-link sharing, and browser back/forward all restore the exact
 * results page without any local state.
 * @returns search results.
 */
export const useSearch = (): UseSearch => {
  const { portalURL } = useSiteConfig();
  const { asPath } = useRouter();
  const searchParams = useSearchParams();
  const requestURL = getRequestURL(
    portalURL,
    searchParams,
    getSearchIndex(searchParams)
  );
  const { isIdle, isLoading, isSuccess, response } =
    useFetchSearch<Response>(requestURL);

  return {
    isLoading: isIdle || isLoading,
    isSuccess: isSuccess,
    isValid: isRequestValid(asPath),
    pagination: mapSearchPagination(response),
    results: mapSearchResults(response),
  };
};
