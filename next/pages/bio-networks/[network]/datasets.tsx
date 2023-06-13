import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React from "react";
import { NetworkParam } from ".";
import { NETWORKS } from "../../../constants/networks";
import { NetworkProvider } from "../../../contexts/networkContext";
import { NetworkDetailDatasets } from "../../../views/NetworkDetailView/NetworkDetailDatasets/networkDetailDatasets";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: NETWORKS.map((network) => ({
      params: { network: network.path },
    })),
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

const Page = ({ network }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <NetworkProvider value={network}>
      <NetworkDetailDatasets />
    </NetworkProvider>
  );
};

export default Page;
