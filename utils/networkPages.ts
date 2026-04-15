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

  // Populate integrated atlases for tracker-sourced atlases immutably.
  const atlases = await Promise.all(
    network.atlases.map(async (atlas) => {
      if (!atlas.tracker) return atlas;
      const { shortNameSlug, version } = atlas.tracker;
      const atlasId = await resolveTrackerAtlasId(shortNameSlug, version);
      const componentAtlases = await fetchTrackerComponentAtlases(atlasId);
      return {
        ...atlas,
        integratedAtlases: componentAtlases.map((component) =>
          mapTrackerComponentAtlasToIntegratedAtlas(
            component,
            network.key,
            shortNameSlug,
            version
          )
        ),
      };
    })
  );

  return {
    props: {
      network: processNetwork({ ...network, atlases }, cxgDatasets),
      pageTitle: `${network.name} - ${tabName}`,
    },
  };
}
