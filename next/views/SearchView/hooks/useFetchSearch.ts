import { useAsync } from "@databiosphere/findable-ui/lib/hooks/useAsync";
import { useCallback, useEffect } from "react";

export interface UseFetchSearch<R> {
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  response?: R;
}

/**
 * Hook facilitating the fetching of search results.
 * @param requestURL - Request URL.
 * @returns search results.
 */
export const useFetchSearch = <R>(
  requestURL: string | undefined
): UseFetchSearch<R> => {
  const { data, isIdle, isLoading, isSuccess, run } = useAsync<R>();

  const fetchData = useCallback(async (requestUrl: string): Promise<R> => {
    const res = await fetch(requestUrl);
    return await res.json();
  }, []);

  useEffect(() => {
    if (!requestURL) return;
    run(fetchData(requestURL));
  }, [fetchData, requestURL, run]);

  return { isIdle, isLoading, isSuccess, response: data };
};
