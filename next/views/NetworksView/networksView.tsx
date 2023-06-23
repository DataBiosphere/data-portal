import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import { BackPageHero } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import React from "react";
import { MainColumn } from "./mainColumn";

export const NetworksView = (): JSX.Element => {
  return (
    <Detail
      mainColumn={<MainColumn />}
      top={<BackPageHero title="Biological Networks" />}
    />
  );
};
