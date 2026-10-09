import { filterProjectId } from "@/apis/azul/hca-dcp/common/filters";
import type { ProjectsResponse } from "@/apis/azul/hca-dcp/common/responses";
import { processEntityValue } from "@/apis/azul/hca-dcp/common/utils";
import { config } from "@/config/config";
import { NETWORKS } from "@/constants/networks";
import type { Atlas, AtlasContext, CXGDataset, Network } from "@/types/network";
import { COLLATOR_CASE_INSENSITIVE } from "@databiosphere/findable-ui/lib/common/constants";
import { fetchAllEntities } from "@databiosphere/findable-ui/lib/entity/api/service";
import type {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import type { ParsedUrlQuery } from "querystring";
import { getAvailableNetwork, isAtlasPublished } from "./availableNetworks";
import {
  fetchCXGDatasetsForAtlases,
  processAtlas,
  processNetwork,
} from "./network";
import { getTrackerContentStaticProps } from "./trackerAtlasPages";

interface StaticPaths extends ParsedUrlQuery {
  atlas: string;
  network: string;
}

export interface StaticProps extends AtlasContext {
  pageTitle: string;
}

export interface TrackerDataOptions {
  withSourceDatasets?: boolean;
}

export const getStaticPaths: GetStaticPaths<StaticPaths> = () =>
  buildStaticPaths(isAtlasPublished);

/**
 * Static paths for non-tracker atlases only. Tracker-sourced atlases are
 * excluded entirely - they are served by the `/source-datasets` route.
 * @returns static paths for non-tracker atlases.
 */
export const getNonTrackerStaticPaths: GetStaticPaths<StaticPaths> = () =>
  buildStaticPaths((atlas) => !atlas.tracker);

/**
 * Static paths for tracker-sourced atlases only, gated on the atlas being
 * published in the tracker. Non-tracker atlases are excluded entirely.
 * @returns static paths for published tracker atlases.
 */
export const getTrackerStaticPaths: GetStaticPaths<StaticPaths> = () =>
  buildStaticPaths(
    async (atlas) => Boolean(atlas.tracker) && isAtlasPublished(atlas)
  );

/**
 * Builds static props for an atlas page, delegating to the tracker builder when
 * the atlas is tracker-sourced.
 * @param context - Static props context carrying the network and atlas params.
 * @param tabName - Tab name for the page title.
 * @param options - Tracker collections the route requires; tracker atlases only.
 * @returns static props for the atlas page.
 */
export async function getContentStaticProps(
  context: GetStaticPropsContext,
  tabName: string,
  options?: TrackerDataOptions
): Promise<GetStaticPropsResult<StaticProps>> {
  const { atlas: atlasParam, network: networkParam } = context.params ?? {};

  const configuredNetwork = NETWORKS.find(
    ({ path }) => path === networkParam
  ) as Network;
  // Found in the configured network, not the filtered one, so an atlas that
  // reads as unpublished here still reaches `resolveTrackerAtlas` and its
  // clear error rather than crashing on an undefined atlas.
  const atlas = configuredNetwork.atlases.find(
    ({ path }) => path === atlasParam
  ) as Atlas;
  // Drop unpublished sibling atlases so the page's network agrees with the
  // network and home pages.
  const network = await getAvailableNetwork(configuredNetwork);

  // Delegate to tracker path if atlas has tracker config.
  if (atlas.tracker) {
    return getTrackerContentStaticProps(atlas, network, tabName, options);
  }

  const [hcaProjects, cxgDatasets] = await Promise.all([
    fetchAtlasProjects(atlas),
    fetchCXGDatasetsForAtlases([atlas]),
  ]);

  // Sort the merged list so external datasets interleave with HCA projects by
  // title.
  const projectsResponses = [...hcaProjects, ...atlas.externalDatasets].sort(
    sortDatasets
  );
  cxgDatasets.sort(sortCXGDatasets);

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
 * Builds the static paths for every atlas the predicate accepts, preserving
 * network and atlas declaration order.
 * @param predicate - Returns true when the atlas should emit a path.
 * @returns static paths result.
 */
async function buildStaticPaths(
  predicate: (atlas: Atlas) => boolean | Promise<boolean>
): Promise<GetStaticPathsResult<StaticPaths>> {
  const paths: Array<{ params: StaticPaths }> = [];

  for (const network of NETWORKS) {
    for (const atlas of network.atlases) {
      if (!(await predicate(atlas))) continue;
      paths.push({ params: { atlas: atlas.path, network: network.path } });
    }
  }

  return {
    fallback: false,
    paths,
  };
}

/**
 * Fetches the Azul projects for the atlas's HCA datasets, paginating so an
 * atlas with more datasets than Azul's page size cap still gets every project.
 * @param atlas - Atlas whose HCA datasets to fetch.
 * @returns Azul projects for the atlas, or an empty list if it has no HCA datasets.
 */
async function fetchAtlasProjects(atlas: Atlas): Promise<ProjectsResponse[]> {
  // Required for correctness, not just to save a request: with no datasets,
  // `filterProjectId([])` would send an empty `projectId` filter, and Azul
  // does not define what that returns.
  if (atlas.datasets.length === 0) return [];

  const {
    dataSource: { url },
  } = config();

  const { hits } = await fetchAllEntities(
    `${url}/projects`,
    undefined,
    undefined,
    filterProjectId(atlas.datasets)
  );
  return hits;
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
