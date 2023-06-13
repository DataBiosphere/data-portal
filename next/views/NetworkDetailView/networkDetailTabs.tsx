import { Tabs } from "@clevercanary/data-explorer-ui/lib/components/common/Tabs/tabs";
import React from "react";

export const NetworkDetailTabs = () => {
  return (
    <Tabs
      onTabChange={() => console.log("changed")}
      value={0}
      tabs={[
        {
          label: "Overview",
          value: 0,
        },
        {
          label: "Datasets",
          value: 1,
        },
      ]}
    />
  );
};
