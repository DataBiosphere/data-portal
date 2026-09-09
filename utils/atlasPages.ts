import { COLLATOR_CASE_INSENSITIVE } from "@databiosphere/findable-ui/lib/common/constants";
import { fetchEntitiesFromQuery } from "@databiosphere/findable-ui/lib/entity/api/service";
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { Atlas, AtlasContext, CXGDataset, Network } from "../@types/network";
import { filterProjectId } from "../apis/azul/hca-dcp/common/filters";
import { ProjectsResponse } from "../apis/azul/hca-dcp/common/responses";
import { processEntityValue } from "../apis/azul/hca-dcp/common/utils";
import { isTrackerAtlasPublished } from "../apis/tracker/api";
import { config } from "../config/config";
import { NETWORKS } from "../constants/networks";
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

export const getStaticPaths: GetStaticPaths<StaticPaths> = () =>
  buildStaticPaths((atlas) =>
    atlas.tracker ? isPublishedTrackerAtlas(atlas) : true
  );

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
  buildStaticPaths(isPublishedTrackerAtlas);

export async function getContentStaticProps(
  context: GetStaticPropsContext,
  tabName: string
): Promise<GetStaticPropsResult<StaticProps>> {
  const { atlas: atlasParam, network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;
  const atlas = network.atlases.find(
    ({ path }) => path === atlasParam
  ) as Atlas;

  // Delegate to tracker path if atlas has tracker config.
  if (atlas.tracker) {
    return getTrackerContentStaticProps(atlas, network, tabName);
  }

  const {
    dataSource: { url },
  } = config();

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

  const cxgDatasets = await fetchCXGDatasetsForAtlases([atlas]);
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
 * Returns true when the atlas is tracker-sourced and published in the tracker.
 * @param atlas - Atlas to check.
 * @returns true if the atlas is a published tracker atlas.
 */
async function isPublishedTrackerAtlas(atlas: Atlas): Promise<boolean> {
  if (!atlas.tracker) return false;
  const { shortNameSlug, version } = atlas.tracker;
  return isTrackerAtlasPublished(shortNameSlug, version);
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
