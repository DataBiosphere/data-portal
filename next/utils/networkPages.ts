import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { Network, NetworkParam } from "../@types/network";
import { NETWORKS } from "../constants/networks";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: NETWORKS.map((network) => ({ params: { network: network.path } })),
  };
};

export const getStaticProps: GetStaticProps<NetworkParam> = async (
  context: GetStaticPropsContext
) => {
  const { network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam) as Network;

  return { props: { network } };
};
