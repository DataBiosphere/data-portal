import { useSearchParams } from "next/navigation";
import Router, { useRouter } from "next/router";
import { useCallback } from "react";
import { UsePagination } from "./types";
import { getPaginationParams } from "./utils";

/**
 * Hook facilitating pagination by encoding the search index in the URL.
 * @returns pagination functionality.
 */
export const usePagination = (): UsePagination => {
  const { pathname } = useRouter();
  const searchParams = useSearchParams();

  const onPaginate = useCallback(
    (searchIndex: number): void => {
      Router.push({
        pathname,
        search: getPaginationParams(searchParams, searchIndex).toString(),
      });
    },
    [pathname, searchParams]
  );

  return { onPaginate };
};
