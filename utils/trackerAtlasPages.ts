import type { GetStaticPropsResult } from "next";
import type { Atlas, Network } from "../@types/network";
import {
  fetchTrackerComponentAtlases,
  fetchTrackerSourceDatasets,
  fetchTrackerSourceStudies,
  resolveTrackerAtlas,
} from "../apis/tracker/api";
import type { StaticProps } from "./atlasPages";
import { buildCAPProjectLink } from "./network";
import {
  buildTrackerCXGDataPortalLink,
  buildTrackerSourceDatasetAsset,
  mapTrackerComponentAtlasToIntegratedAtlas,
} from "./trackerNetwork";

/**
 * Fetches and builds static props for a tracker-sourced atlas.
 * @param atlas - Atlas with tracker configuration.
 * @param network - Network containing the atlas.
 * @param tabName - Tab name for the page title.
 * @returns static props for the atlas page.
 */
export async function getTrackerContentStaticProps(
  atlas: Atlas,
  network: Network,
  tabName: string
): Promise<GetStaticPropsResult<StaticProps>> {
  const { tracker } = atlas;
  if (!tracker) {
    throw new Error("Atlas does not have tracker configuration");
  }

  // Resolve the published atlas from slug + version (not hardcoded).
  const trackerAtlas = await resolveTrackerAtlas(
    tracker.shortNameSlug,
    tracker.version
  );
  const { capId, id: atlasId } = trackerAtlas;

  const [componentAtlases, sourceDatasets, sourceStudies] = await Promise.all([
    fetchTrackerComponentAtlases(atlasId),
    fetchTrackerSourceDatasets(atlasId),
    fetchTrackerSourceStudies(atlasId),
  ]);

  const integratedAtlases = componentAtlases.map(
    mapTrackerComponentAtlasToIntegratedAtlas
  );

  const trackerSourceDatasets = sourceDatasets.map((sd) => ({
    ...sd,
    datasetAsset: buildTrackerSourceDatasetAsset(sd),
  }));

  const cxgDataPortal = buildTrackerCXGDataPortalLink(
    trackerAtlas,
    atlas.cxgId
  );

  const processedAtlas: Atlas = {
    ...atlas,
    // Only set when the atlas has a CAP project, and when it has a CELLxGENE
    // collection (from the tracker, or the configured `cxgId` fallback); an
    // explicit `undefined` is not JSON-serializable by `getStaticProps`.
    ...(capId && { cap: buildCAPProjectLink(capId) }),
    ...(cxgDataPortal && { cxgDataPortal }),
    integratedAtlases,
    trackerAtlasId: atlasId,
  };

  const processedNetwork: Network = {
    ...network,
    atlases: network.atlases.map((a) =>
      a.key === atlas.key ? processedAtlas : a
    ),
  };

  return {
    props: {
      atlas: processedAtlas,
      network: processedNetwork,
      pageTitle: `${atlas.name} - ${tabName}`,
      projectsResponses: [],
      trackerSourceDatasets,
      trackerSourceStudies: sourceStudies,
    },
  };
}
