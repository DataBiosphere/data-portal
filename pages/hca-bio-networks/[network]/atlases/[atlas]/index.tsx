import { Detail } from "@databiosphere/findable-ui/lib/components/Detail/detail";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { Hero } from "../../../../../components/HCABioNetworks/Network/Atlas/components/common/Hero/hero";
import { Tabs } from "../../../../../components/HCABioNetworks/Network/Atlas/components/common/Tabs/tabs";
import { MainColumn } from "../../../../../components/HCABioNetworks/Network/Atlas/components/Overview/components/MainColumn/mainColumn";
import { SideColumn } from "../../../../../components/HCABioNetworks/Network/Atlas/components/Overview/components/SideColumn/sideColumn";
import { AtlasProvider } from "../../../../../contexts/atlasContext";
import * as atlasPages from "../../../../../utils/atlasPages";
import {
  getContentStaticProps,
  StaticProps,
} from "../../../../../utils/atlasPages";

export const getStaticPaths: GetStaticPaths = atlasPages.getStaticPaths;

export const getStaticProps: GetStaticProps<StaticProps> = async (
  context: GetStaticPropsContext
) => {
  return getContentStaticProps(context, "Overview");
};

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
