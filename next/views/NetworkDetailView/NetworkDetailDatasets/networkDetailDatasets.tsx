import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import React from "react";
import { NetworkDetailTabs } from "../networkDetailTabs";
import { NetworkDetailTitle } from "../networkDetailTitle";
import { NetworkDetailMainColumn } from "./networkDetailMainColumn";
import { NetworkDetailSideColumn } from "./networkDetailSideColumn";

export const NetworkDetailDatasets = (): JSX.Element => {
  return (
    <Detail
      isDetailOverview
      mainColumn={<NetworkDetailMainColumn />}
      sideColumn={<NetworkDetailSideColumn />}
      top={<NetworkDetailTitle />}
      Tabs={<NetworkDetailTabs />}
    />
  );
};
