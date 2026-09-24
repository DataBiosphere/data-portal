import type { Atlas, Network } from "../@types/network";
import { isTrackerAtlasPublished } from "../apis/tracker/api";
import { NETWORKS } from "../constants/networks";

/**
 * Drops tracker atlases that are not currently published in the tracker;
 * non-tracker atlases are always kept. Shared by every build-time caller that
 * lists atlases so they cannot disagree on which atlases are published.
 * @param atlases - Atlases to filter.
 * @returns the atlases that should be shown, in their original order.
 */
export async function filterPublishedAtlases(
  atlases: Atlas[]
): Promise<Atlas[]> {
  const flags = await Promise.all(
    atlases.map((a) =>
      a.tracker
        ? isTrackerAtlasPublished(a.tracker.shortNameSlug, a.tracker.version)
        : Promise.resolve(true)
    )
  );
  return atlases.filter((_, i) => flags[i]);
}

/**
 * Returns NETWORKS with unpublished tracker atlases filtered out. Used at
 * build time by pages that surface atlas-level data (home page badges,
 * bio-networks index table) so they stay consistent with the atlas pages
 * — which are themselves filtered by getStaticPaths.
 * @returns networks with unpublished tracker atlases filtered out.
 */
export async function getAvailableNetworks(): Promise<Network[]> {
  return Promise.all(
    NETWORKS.map(async (network) => ({
      ...network,
      atlases: await filterPublishedAtlases(network.atlases),
    }))
  );
}
