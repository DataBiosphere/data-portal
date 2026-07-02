import { SEARCH_PARAMETERS } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Actions/components/Search/components/SearchBar/common/constants";
import { useSearchParams } from "next/navigation";
import Router, { useRouter } from "next/router";
import { useCallback } from "react";
import { SEARCH_CATEGORY } from "../common/constants";
import { getCategory } from "./common/utils";

export interface UseSearchCategory {
  category: SEARCH_CATEGORY | null;
  onChangeCategory: (category: SEARCH_CATEGORY | null) => void;
}

/**
 * Hook facilitating search functionality; returning search category and category change functionality.
 * The active category is derived from the URL so it stays in sync on refresh,
 * deep-link sharing, and browser back/forward.
 * @returns search category and category related functionality.
 */
export const useSearchCategory = (): UseSearchCategory => {
  const { pathname } = useRouter();
  const searchParams = useSearchParams();
  const category = getCategory(searchParams);

  const onChangeCategory = useCallback(
    (category: SEARCH_CATEGORY | null) => {
      Router.push({
        pathname,
        search: getSearchParams(category, searchParams).toString(),
      });
    },
    [pathname, searchParams]
  );

  return { category, onChangeCategory };
};

/**
 * Return the search params, for the given category.
 * @param category - Search category.
 * @param searchParams - Current search params.
 * @returns searchParams.
 */
function getSearchParams(
  category: SEARCH_CATEGORY | null,
  searchParams: URLSearchParams
): URLSearchParams {
  const params = new URLSearchParams(searchParams.toString());
  if (category) {
    params.set(SEARCH_PARAMETERS.CATEGORY, encodeURIComponent(category));
  } else {
    params.delete(SEARCH_PARAMETERS.CATEGORY);
  }
  // Changing category yields a different result set, so reset pagination.
  params.delete(SEARCH_PARAMETERS.START);
  return params;
}
