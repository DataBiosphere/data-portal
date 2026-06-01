import { Detail } from "@databiosphere/findable-ui/lib/components/Detail/detail";
import { BackPageHero } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { JSX } from "react";
import type { Network } from "../../@types/network";
import { MainColumn } from "../../components/HCABioNetworks/components/Index/components/MainColumn/mainColumn";
import { NetworkListProvider } from "../../hooks/useNetworkList";
import { getAvailableNetworks } from "../../utils/availableNetworks";

interface Props {
  networks: Network[];
  pageTitle: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const networks = await getAvailableNetworks();
  return {
    props: {
      networks,
      pageTitle: "HCA Biological Network Atlases",
    },
  };
};

const Page = ({
  networks,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <NetworkListProvider value={networks}>
      <Detail
        mainColumn={<MainColumn />}
        top={<BackPageHero title="HCA Biological Network Atlases" />}
      />
    </NetworkListProvider>
  );
};

export default Page;
