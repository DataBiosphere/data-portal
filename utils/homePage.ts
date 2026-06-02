import { APIEndpoints } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { fetchSummaryFromURL } from "@databiosphere/findable-ui/lib/entity/api/service";
import { GetStaticProps } from "next";
import type { Network } from "../@types/network";
import { config } from "../config/config";
import { Summary } from "../contexts/summaryContext";
import { getAvailableNetworks } from "./availableNetworks";
import { bindSummaryResponse } from "./summary";

export interface HomeStaticProps extends Summary {
  networks: Network[];
}

export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  const {
    dataSource: { defaultParams, url },
  } = config();
  const summaryURL = buildSummaryURL(url, defaultParams?.catalog);
  const summaryResponse = await fetchSummaryFromURL(summaryURL, undefined);
  const summary = bindSummaryResponse(summaryResponse);
  const networks = await getAvailableNetworks();
  return {
    props: {
      ...summary,
      networks,
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
