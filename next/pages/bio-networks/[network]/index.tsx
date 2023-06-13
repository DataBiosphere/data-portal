import { NETWORKS } from "constants/networks";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { Network } from "../../../@types/network";
import { NetworkProvider } from "../../../contexts/networkContext";
import { NetworkDetailOverview } from "../../../views/NetworkDetailView/NetworkDetailOverview/networkDetailOverview";

export type NetworkParam = {
  network: Network;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: NETWORKS.map((network) => ({ params: { network: network.path } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NetworkParam> = async (
  context: GetStaticPropsContext
) => {
  const { network: networkParam } = context.params ?? {};

  const network = NETWORKS.find(({ path }) => path === networkParam)!;

  return { props: { network } };
};

export const Page = ({
  network,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <NetworkProvider value={network}>
      <NetworkDetailOverview />
    </NetworkProvider>
  );
};

export default Page;
