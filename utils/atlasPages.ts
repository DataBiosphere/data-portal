import { filterProjectId } from "@/apis/azul/hca-dcp/common/filters";
import type { ProjectsResponse } from "@/apis/azul/hca-dcp/common/responses";
import { config } from "@/config/config";
import { EXTERNAL_DATASETS } from "@/constants/datasets";
import { NETWORKS } from "@/constants/networks";
import type {
  Atlas,
  AtlasContext,
  CXGDataset,
  Network,
  SourceStudyRow,
} from "@/types/network";
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
import { buildSourceStudyRow } from "./sourceStudies";
import { getTrackerContentStaticProps } from "./trackerAtlasPages";

export interface AtlasDataOptions {
  withProjects?: boolean; // Non-tracker atlases only: fetch Azul projects.
  withSourceDatasets?: boolean; // Tracker atlases only: fetch source datasets.
}

interface StaticPaths extends ParsedUrlQuery {
  atlas: string;
  network: string;
}

export interface StaticProps extends AtlasContext {
  pageTitle: string;
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
 * @param options - Data the route requires: `withProjects` for non-tracker
 * atlases, `withSourceDatasets` for tracker atlases.
 * @returns static props for the atlas page.
 */
export async function getContentStaticProps(
  context: GetStaticPropsContext,
  tabName: string,
  options: AtlasDataOptions = {}
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

  // Azul projects are fetched only for the route that renders them, so no
  // other route pays for requests whose data it never displays. This trims the
  // request count and the page payload, not the build's exposure to an Azul
  // outage: `output: "export"` builds every route in one pass, so a 5xx still
  // fails the whole build via the datasets route.
  const [hcaProjects, cxgDatasets] = await Promise.all([
    options.withProjects ? fetchAtlasProjects(atlas) : undefined,
    fetchCXGDatasetsForAtlases([atlas]),
  ]);

  // Keep only the fields the Source Studies table renders, then sort the merged
  // rows so external datasets interleave with HCA projects by title.
  const { browserURL } = config();
  const sourceStudies =
    hcaProjects &&
    [
      ...hcaProjects.map((projectsResponse) =>
        buildSourceStudyRow(projectsResponse, browserURL)
      ),
      ...(EXTERNAL_DATASETS[atlas.key] ?? []),
    ].sort(sortSourceStudies);
  cxgDatasets.sort(sortCXGDatasets);

  return {
    props: {
      atlas: processAtlas(atlas, cxgDatasets),
      network: processNetwork(network, cxgDatasets),
      pageTitle: `${atlas.name} - ${tabName}`,
      // Omitted when not fetched, as `getTrackerContentStaticProps` does for
      // `trackerSourceDatasets`.
      ...(sourceStudies && { sourceStudies }),
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
 * Sort source study rows by title, ascending.
 * @param s0 - First source study to compare.
 * @param s1 - Second source study to compare.
 * @returns Number indicating sort precedence of s0 vs s1.
 */
function sortSourceStudies(s0: SourceStudyRow, s1: SourceStudyRow): number {
  return COLLATOR_CASE_INSENSITIVE.compare(s0.title, s1.title);
}
