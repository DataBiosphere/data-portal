import { Detail } from "@databiosphere/findable-ui/lib/components/Detail/detail";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React from "react";
import { Hero } from "../../../components/HCABioNetworks/Network/components/common/Hero/hero";
import { Tabs } from "../../../components/HCABioNetworks/Network/components/common/Tabs/tabs";
import { MainColumn } from "../../../components/HCABioNetworks/Network/components/Datasets/components/MainColumn/mainColumn";
import { NetworkProvider } from "../../../contexts/networkContext";
import * as networkPages from "../../../utils/networkPages";
import {
  getContentStaticProps,
  StaticProps,
} from "../../../utils/networkPages";

export const getStaticPaths: GetStaticPaths = networkPages.getStaticPaths;

export const getStaticProps: GetStaticProps<StaticProps> = async (
  context: GetStaticPropsContext
) => {
  return getContentStaticProps(context, "Datasets");
};

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
