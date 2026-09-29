import { Hero } from "@/components/HCABioNetworks/Network/Atlas/components/common/Hero/hero";
import { Tabs } from "@/components/HCABioNetworks/Network/Atlas/components/common/Tabs/tabs";
import { MainColumn } from "@/components/HCABioNetworks/Network/Atlas/components/SourceDatasets/components/MainColumn/mainColumn";
import { AtlasProvider } from "@/contexts/atlasContext";
import {
  getContentStaticProps,
  getTrackerStaticPaths,
  StaticProps,
} from "@/utils/atlasPages";
import { Detail } from "@databiosphere/findable-ui/lib/components/Detail/detail";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { JSX } from "react";

export const getStaticPaths: GetStaticPaths = getTrackerStaticPaths;

export const getStaticProps: GetStaticProps<StaticProps> = async (
  context: GetStaticPropsContext
) => {
  return getContentStaticProps(context, "Source Datasets", {
    withSourceDatasets: true,
  });
};

const Page = ({
  atlas,
  network,
  projectsResponses,
  trackerSourceDatasets = [],
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <AtlasProvider
      value={{
        atlas,
        network,
        projectsResponses,
        trackerSourceDatasets,
      }}
    >
      <Detail mainColumn={<MainColumn />} Tabs={<Tabs />} top={<Hero />} />
    </AtlasProvider>
  );
};

export default Page;
