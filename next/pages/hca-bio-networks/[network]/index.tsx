import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { Hero } from "../../../components/HCABioNetworks/Network/components/common/Hero/hero";
import { Tabs } from "../../../components/HCABioNetworks/Network/components/common/Tabs/tabs";
import { MainColumn } from "../../../components/HCABioNetworks/Network/components/Overview/components/MainColumn/mainColumn";
import { SideColumn } from "../../../components/HCABioNetworks/Network/components/Overview/components/SideColumn/sideColumn";
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
  return getContentStaticProps(context, "Overview");
};

export const Page = ({
  network,
  projectsResponses,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NetworkProvider value={{ network, projectsResponses }}>
      <Detail
        mainColumn={<MainColumn />}
        sideColumn={<SideColumn />}
        Tabs={<Tabs />}
        top={<Hero />}
      />
    </NetworkProvider>
  );
};

export default Page;
