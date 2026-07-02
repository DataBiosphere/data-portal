import { SEARCH_PARAMETERS } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Actions/components/Search/components/SearchBar/common/constants";
import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Returns the search params with the pagination index applied, preserving the
 * existing search term and category.
 * @param searchParams - Current search params.
 * @param searchIndex - Search index (start index).
 * @returns updated search params.
 */
export function getPaginationParams(
  searchParams: ReadonlyURLSearchParams | null,
  searchIndex: number
): URLSearchParams {
  const params = new URLSearchParams(searchParams?.toString());
  params.set(SEARCH_PARAMETERS.START, searchIndex.toString());
  return params;
}
