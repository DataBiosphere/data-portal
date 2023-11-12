import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { NetworkParam } from "../../../@types/network";
import { Hero } from "../../../components/HCABioNetworks/Network/components/common/Hero/hero";
import { Tabs } from "../../../components/HCABioNetworks/Network/components/common/Tabs/tabs";
import { MainColumn } from "../../../components/HCABioNetworks/Network/components/Publications/components/MainColumn/mainColumn";
import { NetworkProvider } from "../../../contexts/networkContext";
import * as networkPublicationPages from "../../../utils/networkPublicationPages";

export const getStaticPaths: GetStaticPaths =
  networkPublicationPages.getStaticPaths;

export const getStaticProps: GetStaticProps<NetworkParam> =
  networkPublicationPages.getStaticProps;

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
