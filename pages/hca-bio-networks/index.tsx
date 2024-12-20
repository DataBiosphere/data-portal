import { Detail } from "@databiosphere/findable-ui/lib/components/Detail/detail";
import { BackPageHero } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { GetStaticProps } from "next";
import { MainColumn } from "../../components/HCABioNetworks/components/Index/components/MainColumn/mainColumn";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      pageTitle: "HCA Biological Network Atlases",
    },
  };
};

const Page = (): JSX.Element => {
  return (
    <Detail
      mainColumn={<MainColumn />}
      top={<BackPageHero title="HCA Biological Network Atlases" />}
    />
  );
};

export default Page;
