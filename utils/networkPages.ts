import {
  GetStaticPaths,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { Network, NetworkParam } from "../@types/network";
import { NETWORKS } from "../constants/networks";
import { fetchCXGDatasetsForAtlases, processNetwork } from "./network";

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
  return {
    props: {
      network: processNetwork(network, cxgDatasets),
      pageTitle: `${network.name} - ${tabName}`,
    },
  };
}
