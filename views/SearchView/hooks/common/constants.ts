export const SEARCH_ENGINE_PARAMETER_ID = "hca";

export const SEARCH_ENGINE_PARAMETERS = {
  ID: "cx",
  NUM: "num",
  QUERY: "q",
  SAFE: "safe",
  START: "start",
};

export const SEARCH_ENGINE_PARAMETER_SAFE = "active";

export const SEARCH_ENGINE_PATH = "/customsearch/v1";

/**
 * Google Custom Search uses 1-based pagination, so the first results page starts
 * at index 1. An absent or invalid start param defaults to this.
 */
export const SEARCH_ENGINE_MIN_START_INDEX = 1;

/**
 * Google Custom Search returns 10 results per page and only paginates the first
 * 100 results, so the last valid start index is 91 (results 91–100). A larger
 * start index (e.g. from a hand-edited or stale URL) is clamped to this value to
 * avoid requesting an out-of-range page that returns no results.
 */
export const SEARCH_ENGINE_MAX_START_INDEX = 91;
