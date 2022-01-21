/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for HCA Data Portal specific Google Custom Search Engine functionality.
 */

// App dependencies
import GCSEParameter from "./gcse-parameter";

/**
 * Returns http request URL for Google Custom Search Engine.
 * See https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list.
 *
 * @param query
 * @param partner
 * @param start
 * @param portalUrl
 * @param searchEngineId
 */
export function getGCSERequestURL(
  query: string,
  partner: string,
  start: number,
  portalUrl: string,
  searchEngineId?: string
): string {
  /* Return empty request url when search engine id is not defined. */
  if (!searchEngineId) {
    return "";
  }

  const searchQuery = partner ? `${query} more:${partner}` : query;
  const paramGCSEId = `${GCSEParameter.ID}=${searchEngineId}`;
  const paramQuery = `${GCSEParameter.QUERY}=${searchQuery}`;
  const paramSafe = `${GCSEParameter.SAFE}=active`;
  const paramStart = `${GCSEParameter.START}=${start}`;
  const parameters = `${paramGCSEId}&${paramQuery}&${paramSafe}&${paramStart}`;
  return `${portalUrl}customsearch/v1?${encodeURI(parameters)}`;
}
