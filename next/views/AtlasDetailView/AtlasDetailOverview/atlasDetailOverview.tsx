import { Detail } from "@clevercanary/data-explorer-ui/lib/components/Detail/detail";
import React from "react";
import { AtlasDetailTabs } from "../atlasDetailTabs";
import { AtlasDetailTitle } from "../atlasDetailTitle";
import { AtlasDetailMainColumn } from "./atlasDetailMainColumn";
import { AtlasDetailSideColumn } from "./atlasDetailSideColumn";

export const AtlasDetailOverview = () => {
  return (
    <Detail
      isDetailOverview
      mainColumn={<AtlasDetailMainColumn />}
      sideColumn={<AtlasDetailSideColumn />}
      top={<AtlasDetailTitle />}
      Tabs={<AtlasDetailTabs />}
    />
  );
};
