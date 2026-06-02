import type {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import type { Network, NetworkParam } from "../@types/network";
import {
  fetchTrackerComponentAtlases,
  isTrackerAtlasPublished,
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

  // Drop tracker atlases not currently published in the tracker.
  const publishedFlags = await Promise.all(
    network.atlases.map((a) =>
      a.tracker
        ? isTrackerAtlasPublished(a.tracker.shortNameSlug, a.tracker.version)
        : Promise.resolve(true)
    )
  );
  const availableAtlases = network.atlases.filter((_, i) => publishedFlags[i]);

  // Fetch CELLxGENE datasets for the network atlases.
  const cxgDatasets = await fetchCXGDatasetsForAtlases(availableAtlases);

  // Populate integrated atlases for tracker-sourced atlases immutably.
  const atlases = await Promise.all(
    availableAtlases.map(async (atlas) => {
      if (!atlas.tracker) return atlas;
      const { shortNameSlug, version } = atlas.tracker;
      const atlasId = await resolveTrackerAtlasId(shortNameSlug, version);
      const componentAtlases = await fetchTrackerComponentAtlases(atlasId);
      return {
        ...atlas,
        integratedAtlases: componentAtlases.map(
          mapTrackerComponentAtlasToIntegratedAtlas
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
