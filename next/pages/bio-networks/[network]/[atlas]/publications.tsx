import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import { AtlasProvider } from "contexts/atlasContext";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import { AtlasContext } from "../../../../@types/network";
import { Hero } from "../../../../components/BioNetworks/Network/Atlas/components/common/Hero/hero";
import { Tabs } from "../../../../components/BioNetworks/Network/Atlas/components/common/Tabs/tabs";
import { MainColumn } from "../../../../components/BioNetworks/Network/Atlas/components/Publications/components/MainColumn/mainColumn";
import { SideColumn } from "../../../../components/BioNetworks/Network/Atlas/components/Publications/components/SideColumn/sideColumn";
import * as atlasPages from "../../../../utils/atlasPages";

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
      <Detail
        mainColumn={<MainColumn />}
        sideColumn={<SideColumn />}
        Tabs={<Tabs />}
        top={<Hero />}
      />
    </AtlasProvider>
  );
};

export default Page;
