import type { GetStaticPropsResult } from "next";
import type { Atlas, Network } from "../@types/network";
import {
  fetchTrackerComponentAtlases,
  fetchTrackerSourceDatasets,
  fetchTrackerSourceStudies,
  resolveTrackerAtlasId,
} from "../apis/tracker/api";
import type { StaticProps } from "./atlasPages";
import {
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

  // Resolve atlas ID from slug + version (not hardcoded).
  const atlasId = await resolveTrackerAtlasId(
    tracker.shortNameSlug,
    tracker.version
  );

  const [componentAtlases, sourceDatasets, sourceStudies] = await Promise.all([
    fetchTrackerComponentAtlases(atlasId),
    fetchTrackerSourceDatasets(atlasId),
    fetchTrackerSourceStudies(atlasId),
  ]);

  const { key: networkKey } = network;
  const { shortNameSlug, version } = tracker;
  const integratedAtlases = componentAtlases.map((component) =>
    mapTrackerComponentAtlasToIntegratedAtlas(
      component,
      networkKey,
      shortNameSlug,
      version
    )
  );

  const trackerSourceDatasets = sourceDatasets.map((sd) => ({
    ...sd,
    datasetAsset: buildTrackerSourceDatasetAsset(
      sd,
      networkKey,
      shortNameSlug,
      version
    ),
  }));

  const processedAtlas: Atlas = {
    ...atlas,
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
