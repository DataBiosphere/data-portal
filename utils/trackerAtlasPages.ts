import type { GetStaticPropsResult } from "next";
import type { Atlas, Network, TrackerSourceDataset } from "../@types/network";
import {
  fetchTrackerComponentAtlases,
  fetchTrackerSourceDatasets,
  fetchTrackerSourceStudies,
  resolveTrackerAtlas,
} from "../apis/tracker/api";
import type { StaticProps, TrackerDataOptions } from "./atlasPages";
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
 * @param options - Tracker collections the route being built requires.
 * @returns static props for the atlas page.
 */
export async function getTrackerContentStaticProps(
  atlas: Atlas,
  network: Network,
  tabName: string,
  options: TrackerDataOptions = {}
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

  // Source datasets are fetched only for the route that renders them, so no
  // other route pays for requests whose data it never displays. This trims the
  // request count and the page payload, not the build's exposure to a tracker
  // outage: `output: "export"` builds every route in one pass, so a 5xx from
  // either endpoint still fails the whole build via the source datasets route.
  const [componentAtlases, trackerSourceDatasets] = await Promise.all([
    fetchTrackerComponentAtlases(atlasId),
    options.withSourceDatasets
      ? fetchTrackerSourceDatasetsWithStudyFields(atlasId)
      : undefined,
  ]);

  const integratedAtlases = componentAtlases.map(
    mapTrackerComponentAtlasToIntegratedAtlas
  );

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
      // Omitted rather than set to `undefined`, which `getStaticProps` cannot
      // serialize; consumers default the absent field to an empty list. This
      // keeps the records out of the page payload on routes that skip them.
      ...(trackerSourceDatasets && { trackerSourceDatasets }),
    },
  };
}

/**
 * Fetches the tracker's source datasets for an atlas and joins the fields that
 * live only on the source study onto each one.
 * @param atlasId - Tracker atlas ID (UUID).
 * @returns source datasets carrying their source study fields.
 */
async function fetchTrackerSourceDatasetsWithStudyFields(
  atlasId: string
): Promise<TrackerSourceDataset[]> {
  const [sourceDatasets, sourceStudies] = await Promise.all([
    fetchTrackerSourceDatasets(atlasId),
    fetchTrackerSourceStudies(atlasId),
  ]);

  // Journal, reference author and HCA project ID live only on the source study,
  // so join them onto each source dataset by `sourceStudyId`. A dataset whose
  // study is missing from the response keeps `null` for all three rather than
  // being dropped, so a join miss can never hide a dataset from the table.
  const sourceStudyById = new Map(sourceStudies.map((s) => [s.id, s]));

  return sourceDatasets.map((sd) => {
    const sourceStudy = sourceStudyById.get(sd.sourceStudyId);
    return {
      ...sd,
      datasetAsset: buildTrackerSourceDatasetAsset(sd),
      hcaProjectId: sourceStudy?.hcaProjectId ?? null,
      journal: sourceStudy?.journal ?? null,
      referenceAuthor: sourceStudy?.referenceAuthor ?? null,
    };
  });
}
