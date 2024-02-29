import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { GetStaticPathsResult } from "next/types";
import { Network, NetworkParam } from "../@types/network";
import { NETWORKS } from "../constants/networks";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: buildStaticPaths(),
  };
};

export const getStaticProps: GetStaticProps<NetworkParam> = async (
  context: GetStaticPropsContext
) => {
  const { network: networkParam } = context.params ?? {};
  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;
  return {
    props: {
      network: network,
      pageTitle: `${network.name} - BICCN Publications`,
      projectsResponses: [],
    },
  };
};

/**
 * Returns static paths for all networks that have BICCN publications.
 * @returns static paths for all networks that have BICCN publications.
 */
function buildStaticPaths(): GetStaticPathsResult["paths"] {
  return NETWORKS.filter((network) => Boolean(network.BICCNPublications)).map(
    (network) => ({
      params: { network: network.path },
    })
  );
}
