import { APIEndpoints } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { fetchSummaryFromURL } from "@clevercanary/data-explorer-ui/lib/entity/api/service";
import { GetStaticProps } from "next";
import { config } from "../config/config";
import { Summary } from "../contexts/summaryContext";
import { bindSummaryResponse } from "./summary";

export const getStaticProps: GetStaticProps<Summary> = async () => {
  const {
    dataSource: { defaultParams, url },
  } = config();
  const summaryURL = buildSummaryURL(url, defaultParams?.catalog);
  const summaryResponse = await fetchSummaryFromURL(summaryURL, undefined);
  const summary = bindSummaryResponse(summaryResponse);
  return {
    props: {
      ...summary,
    },
  };
};

/**
 * Builds the summary URL.
 * @param url - Base URL.
 * @param catalog - Catalog.
 * @returns summary URL.
 */
function buildSummaryURL(url: string, catalog?: string): string {
  if (!catalog) {
    return url;
  }
  const summaryURL = new URL(`${url}${APIEndpoints.SUMMARY}`);
  summaryURL.searchParams.append("catalog", catalog);
  return summaryURL.toString();
}
