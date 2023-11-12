import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { AtlasContext } from "../../../../../@types/network";
import { Hero } from "../../../../../components/HCABioNetworks/Network/Atlas/components/common/Hero/hero";
import { Tabs } from "../../../../../components/HCABioNetworks/Network/Atlas/components/common/Tabs/tabs";
import { MainColumn } from "../../../../../components/HCABioNetworks/Network/Atlas/components/Datasets/components/MainColumn/mainColumn";
import { AtlasProvider } from "../../../../../contexts/atlasContext";
import * as atlasPages from "../../../../../utils/atlasPages";

export const getStaticPaths: GetStaticPaths = atlasPages.getStaticPaths;

export const getStaticProps: GetStaticProps<AtlasContext> =
  atlasPages.getStaticProps;

const Page = ({
  atlas,
  network,
  projectsResponses,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <AtlasProvider value={{ atlas, network, projectsResponses }}>
      <Detail mainColumn={<MainColumn />} Tabs={<Tabs />} top={<Hero />} />
    </AtlasProvider>
  );
};

export default Page;
