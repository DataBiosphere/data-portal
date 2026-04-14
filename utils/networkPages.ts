import type {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import type { Network, NetworkParam } from "../@types/network";
import {
  fetchTrackerComponentAtlases,
  resolveTrackerAtlasId,
} from "../apis/tracker/api";
import { NETWORKS } from "../constants/networks";
import { fetchCXGDatasetsForAtlases, processNetwork } from "./network";
import { mapTrackerComponentAtlasToIntegratedAtlas } from "./trackerNetwork";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: NETWORKS.map((network) => ({ params: { network: network.path } })),
  };
};

export interface StaticProps extends NetworkParam {
  pageTitle: string;
}

export async function getContentStaticProps(
  context: GetStaticPropsContext,
  tabName: string
): Promise<GetStaticPropsResult<StaticProps>> {
  const { network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;

  // Fetch CELLxGENE datasets for the network atlases.
  const cxgDatasets = await fetchCXGDatasetsForAtlases(network.atlases);

  // Populate integrated atlases for tracker-sourced atlases.
  for (const atlas of network.atlases) {
    if (atlas.tracker) {
      const atlasId = await resolveTrackerAtlasId(
        atlas.tracker.shortNameSlug,
        atlas.tracker.version
      );
      const componentAtlases = await fetchTrackerComponentAtlases(atlasId);
      atlas.integratedAtlases = componentAtlases.map((component) =>
        mapTrackerComponentAtlasToIntegratedAtlas(
          component,
          network.key,
          atlas.tracker!.shortNameSlug,
          atlas.tracker!.version
        )
      );
    }
  }

  return {
    props: {
      network: processNetwork(network, cxgDatasets),
      pageTitle: `${network.name} - ${tabName}`,
    },
  };
}
