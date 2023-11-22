import { COLLATOR_CASE_INSENSITIVE } from "@clevercanary/data-explorer-ui/lib/common/constants";
import { fetchEntitiesFromQuery } from "@clevercanary/data-explorer-ui/lib/entity/api/service";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { Atlas, AtlasContext, CXGDataset, Network } from "../@types/network";
import { filterProjectId } from "../apis/azul/hca-dcp/common/filters";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";
import { processEntityValue } from "../apis/azul/hca-dcp/common/utils";
import { config } from "../config/config";
import { NETWORKS } from "../constants/networks";
import { processAtlas, processNetwork } from "./network";

interface AtlasPageParam extends ParsedUrlQuery {
  atlas: string;
  network: string;
}

export const getStaticPaths: GetStaticPaths<AtlasPageParam> = async () => {
  const paths: Array<{ params: AtlasPageParam }> = [];

  NETWORKS.forEach((network) => {
    network.atlases.forEach((atlas) => {
      paths.push({ params: { atlas: atlas.path, network: network.path } });
    });
  });

  return {
    fallback: false,
    paths,
  };
};

export const getStaticProps: GetStaticProps<AtlasContext> = async (
  context: GetStaticPropsContext
) => {
  const {
    dataSource: { url },
  } = config();
  const { atlas: atlasParam, network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;
  const atlas = network.atlases.find(
    ({ path }) => path === atlasParam
  ) as Atlas;

  const projectsResponses = [];
  if (atlas.datasets.length > 0) {
    const result = await fetchEntitiesFromQuery(
      `${url}/projects`,
      filterProjectId(atlas.datasets),
      undefined,
      undefined
    );
    projectsResponses.push(...result.hits);
    const datasets = atlas.externalDatasets;
    if (datasets) {
      projectsResponses.push(...datasets);
      projectsResponses.sort(sortDatasets);
    }
  }

  const cxgDatasets = [];
  if (atlas.cxgId) {
    const response = await fetch(
      `https://api.cellxgene.cziscience.com/dp/v1/collections/${atlas.cxgId}`
    );
    const cxgCollection = await response.json();
    cxgDatasets.push(...cxgCollection.datasets);
    cxgDatasets.sort(sortCXGDatasets);
  }

  return {
    props: {
      atlas: processAtlas(atlas, cxgDatasets),
      network: processNetwork(network, cxgDatasets),
      projectsResponses,
    },
  };
};

/**
 * Sort datasets by cell count, descending.
 * @param d0 - First dataset to compare.
 * @param d1 - Second dataset to compare.
 * @returns Number indicating sort precedence of d0 vs d1.
 */
function sortCXGDatasets(d0: CXGDataset, d1: CXGDataset): number {
  return d1.cell_count - d0.cell_count;
}

/**
 * Sort datasets by project title, ascending.
 * @param d0 - First dataset to compare.
 * @param d1 - Second dataset to compare.
 * @returns Number indicating sort precedence of d0 vs d1.
 */
function sortDatasets(d0: ProjectsResponse, d1: ProjectsResponse): number {
  return COLLATOR_CASE_INSENSITIVE.compare(
    processEntityValue(d0.projects, "projectTitle"),
    processEntityValue(d1.projects, "projectTitle")
  );
}
