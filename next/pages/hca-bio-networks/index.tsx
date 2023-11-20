import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import { BackPageHero } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import React from "react";
import { MainColumn } from "../../components/HCABioNetworks/components/Index/components/MainColumn/mainColumn";

const Page = (): JSX.Element => {
  return (
    <Detail
      mainColumn={<MainColumn />}
      top={<BackPageHero title="HCA Biological Network Atlases" />}
    />
  );
};

export default Page;
