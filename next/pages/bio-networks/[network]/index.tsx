import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NetworkParam } from "../../../@types/network";
import { Hero } from "../../../components/Network/components/common/Hero/hero";
import { Tabs } from "../../../components/Network/components/common/Tabs/tabs";
import { MainColumn } from "../../../components/Network/components/Overview/components/MainColumn/mainColumn";
import { SideColumn } from "../../../components/Network/components/Overview/components/SideColumn/sideColumn";
import { NetworkProvider } from "../../../contexts/networkContext";
import * as networkPages from "../../../utils/networkPages";

export const getStaticPaths: GetStaticPaths = networkPages.getStaticPaths;

export const getStaticProps: GetStaticProps<NetworkParam> =
  networkPages.getStaticProps;

export const Page = ({
  network,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NetworkProvider value={{ network, projects }}>
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
