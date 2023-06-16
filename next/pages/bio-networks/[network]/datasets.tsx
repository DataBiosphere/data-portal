import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { NetworkParam } from "../../../@types/network";
import { NetworkProvider } from "../../../contexts/networkContext";
import * as networkPages from "../../../utils/networkPages";
import { NetworkDetailDatasets } from "../../../views/NetworkDetailView/NetworkDetailDatasets/networkDetailDatasets";

export const getStaticPaths: GetStaticPaths = networkPages.getStaticPaths;

export const getStaticProps: GetStaticProps<NetworkParam> =
  networkPages.getStaticProps;

const Page = ({
  network,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NetworkProvider value={network}>
      <NetworkDetailDatasets />
    </NetworkProvider>
  );
};

export default Page;
