import type { Network } from "../@types/network";
import { isTrackerAtlasPublished } from "../apis/tracker/api";
import { NETWORKS } from "../constants/networks";

/**
 * Returns NETWORKS with unpublished tracker atlases filtered out. Used at
 * build time by pages that surface atlas-level data (home page badges,
 * bio-networks index table) so they stay consistent with the atlas pages
 * — which are themselves filtered by getStaticPaths.
 * @returns networks with unpublished tracker atlases filtered out.
 */
export async function getAvailableNetworks(): Promise<Network[]> {
  return Promise.all(
    NETWORKS.map(async (network) => {
      const flags = await Promise.all(
        network.atlases.map((a) =>
          a.tracker
            ? isTrackerAtlasPublished(
                a.tracker.shortNameSlug,
                a.tracker.version
              )
            : Promise.resolve(true)
        )
      );
      return {
        ...network,
        atlases: network.atlases.filter((_, i) => flags[i]),
      };
    })
  );
}
