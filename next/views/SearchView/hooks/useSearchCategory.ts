import { SEARCH_PARAMETERS } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Actions/components/Search/components/SearchBar/common/constants";
import { useSearchParams } from "next/navigation";
import Router, { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { SEARCH_CATEGORY } from "../common/constants";
import { initCategory } from "./common/utils";

export interface UseSearchCategory {
  category: SEARCH_CATEGORY | null;
  onChangeCategory: (category: SEARCH_CATEGORY | null) => void;
}

/**
 * Hook facilitating search functionality; returning search category and category change functionality.
 * @returns search category and category related functionality.
 */
export const useSearchCategory = (): UseSearchCategory => {
  const { asPath, pathname } = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<SEARCH_CATEGORY | null>(
    initCategory(asPath)
  );

  const onRedirect = useCallback(
    (category: SEARCH_CATEGORY | null) => {
      Router.push({
        pathname,
        search: getSearchParams(category, searchParams).toString(),
      });
    },
    [pathname, searchParams]
  );

  const onChangeCategory = useCallback(
    (category: SEARCH_CATEGORY | null) => {
      setCategory(category);
      onRedirect(category);
    },
    [onRedirect]
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
  return params;
}
