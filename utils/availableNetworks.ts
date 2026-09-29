import { isTrackerAtlasPublished } from "@/apis/tracker/api";
import { NETWORKS } from "@/constants/networks";
import type { Atlas, Network } from "@/types/network";

// The publication gate: every build-time decision about whether an atlas is
// shown or gets pages should go through this module, so callers cannot
// disagree on which atlases are published (see #3203). Pages that list atlases
// pass these results to `NetworkListProvider`, whose default is empty so a page
// that skips the gate lists nothing rather than unpublished atlases.

/**
 * Drops tracker atlases that are not currently published in the tracker;
 * non-tracker atlases are always kept.
 * @param atlases - Atlases to filter.
 * @returns the atlases that should be shown, in their original order.
 */
export async function filterPublishedAtlases(
  atlases: Atlas[]
): Promise<Atlas[]> {
  const flags = await Promise.all(atlases.map(isAtlasPublished));
  return atlases.filter((_, i) => flags[i]);
}

/**
 * Returns the network with unpublished tracker atlases filtered out.
 * @param network - Network to filter.
 * @returns network with only available atlases.
 */
export async function getAvailableNetwork(network: Network): Promise<Network> {
  return {
    ...network,
    atlases: await filterPublishedAtlases(network.atlases),
  };
}

/**
 * Returns NETWORKS with unpublished tracker atlases filtered out. Used at
 * build time by pages that surface atlas-level data (home page badges,
 * bio-networks index table) so they stay consistent with the atlas pages
 * — which are themselves filtered by getStaticPaths.
 * @returns networks with unpublished tracker atlases filtered out.
 */
export async function getAvailableNetworks(): Promise<Network[]> {
  return Promise.all(NETWORKS.map(getAvailableNetwork));
}

/**
 * Returns true when the atlas should be shown: non-tracker atlases always are,
 * tracker atlases only while published in the tracker.
 * @param atlas - Atlas to check.
 * @returns true if the atlas is published.
 */
export async function isAtlasPublished(atlas: Atlas): Promise<boolean> {
  if (!atlas.tracker) return true;
  const { shortNameSlug, version } = atlas.tracker;
  return isTrackerAtlasPublished(shortNameSlug, version);
}

/**
 * Returns true when the atlas is tracker-sourced and published in the tracker.
 * @param atlas - Atlas to check.
 * @returns true if the atlas is a published tracker atlas.
 */
export async function isPublishedTrackerAtlas(atlas: Atlas): Promise<boolean> {
  if (!atlas.tracker) return false;
  return isAtlasPublished(atlas);
}
