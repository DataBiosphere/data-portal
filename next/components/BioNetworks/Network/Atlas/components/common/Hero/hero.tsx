import { BackPageHero } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { NETWORKS_ROUTE } from "constants/routes";
import { useAtlas } from "contexts/atlasContext";
import React, { useMemo } from "react";

export const Hero = (): JSX.Element => {
  const { atlas, network } = useAtlas();
  const { name: networkName, path: networkPath } = network;
  const { key: atlasKey, name: atlasName, path: atlasPath } = atlas;

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
        text: atlasKey,
      },
    ],
    [atlasKey, atlasPath, networkName, networkPath]
  );

  return <BackPageHero title={atlasName} breadcrumbs={breadcrumbs} />;
};
