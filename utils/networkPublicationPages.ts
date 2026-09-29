import { NETWORKS } from "@/constants/networks";
import type { Network, NetworkParam } from "@/types/network";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import type { GetStaticPathsResult } from "next/types";

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
      // The page renders only network-level fields, never atlases, so the
      // atlas list is dropped rather than publication-gated: that keeps the
      // page off the tracker and out of its serialized props.
      network: { ...network, atlases: [] },
      pageTitle: `${network.name} - BICCN Publications`,
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
