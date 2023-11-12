import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { NetworkParam } from "../../../@types/network";
import { Hero } from "../../../components/HCABioNetworks/Network/components/common/Hero/hero";
import { Tabs } from "../../../components/HCABioNetworks/Network/components/common/Tabs/tabs";
import { MainColumn } from "../../../components/HCABioNetworks/Network/components/Datasets/components/MainColumn/mainColumn";
import { NetworkProvider } from "../../../contexts/networkContext";
import * as networkPages from "../../../utils/networkPages";

export const getStaticPaths: GetStaticPaths = networkPages.getStaticPaths;

export const getStaticProps: GetStaticProps<NetworkParam> =
  networkPages.getStaticProps;

const Page = ({
  network,
  projectsResponses,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NetworkProvider value={{ network, projectsResponses }}>
      <Detail mainColumn={<MainColumn />} Tabs={<Tabs />} top={<Hero />} />
    </NetworkProvider>
  );
};

export default Page;
