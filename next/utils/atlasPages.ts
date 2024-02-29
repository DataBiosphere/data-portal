import { COLLATOR_CASE_INSENSITIVE } from "@clevercanary/data-explorer-ui/lib/common/constants";
import { fetchEntitiesFromQuery } from "@clevercanary/data-explorer-ui/lib/entity/api/service";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { Atlas, AtlasContext, CXGDataset, Network } from "../@types/network";
import { filterProjectId } from "../apis/azul/hca-dcp/common/filters";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";
import { processEntityValue } from "../apis/azul/hca-dcp/common/utils";
import { config } from "../config/config";
import { NETWORKS } from "../constants/networks";
import { processAtlas, processNetwork } from "./network";

interface StaticPaths extends ParsedUrlQuery {
  atlas: string;
  network: string;
}

export interface StaticProps extends AtlasContext {
  pageTitle: string;
}

export const getStaticPaths: GetStaticPaths<StaticPaths> = async () => {
  const paths: Array<{ params: StaticPaths }> = [];

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

export async function getContentStaticProps(
  context: GetStaticPropsContext,
  tabName: string
): Promise<GetStaticPropsResult<StaticProps>> {
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
      `https://api.cellxgene.cziscience.com/curation/v1/collections/${atlas.cxgId}`
    );
    const cxgCollection = await response.json();
    cxgDatasets.push(
      ...mapDatasets(cxgCollection.datasets, cxgCollection.collection_id)
    );
    cxgDatasets.sort(sortCXGDatasets);
  }

  return {
    props: {
      atlas: processAtlas(atlas, cxgDatasets),
      network: processNetwork(network, cxgDatasets),
      pageTitle: `${atlas.name} - ${tabName}`,
      projectsResponses,
    },
  };
}

/**
 * Returns CELLxGENE datasets with the corresponding collection ID.
 * @param cxgDatasets - CELLxGENE dataset responses.
 * @param collection_id - Collection ID.
 * @returns CELLxGENE datasets.
 */
function mapDatasets(
  cxgDatasets: Omit<CXGDataset, "collection_id">[],
  collection_id: string
): CXGDataset[] {
  return cxgDatasets.map((cxgDataset) => ({ ...cxgDataset, collection_id }));
}

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
