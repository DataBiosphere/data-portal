import { BackPageHero } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { NETWORKS_ROUTE } from "constants/routes";
import { useAtlas } from "contexts/atlasContext";
import React, { useMemo } from "react";

export const AtlasDetailTitle = (): JSX.Element => {
  const { atlas, network } = useAtlas();
  const { name: networkName, path: networkPath } = network;
  const { name: atlasName, path: atlasPath } = atlas;

  const breadcrumbs = useMemo(
    () => [
      {
        path: NETWORKS_ROUTE,
        text: "Biological Networks",
      },
      {
        path: NETWORKS_ROUTE + "/" + networkPath,
        text: networkName,
      },
      {
        path: NETWORKS_ROUTE + "/" + networkPath + "/" + atlasPath,
        text: atlasPath,
      },
    ],
    [networkName, networkPath, atlasPath]
  );

  return <BackPageHero title={atlasName} breadcrumbs={breadcrumbs} />;
};
