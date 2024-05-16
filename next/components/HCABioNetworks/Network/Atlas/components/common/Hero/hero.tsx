import { BackPageHero } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { NETWORKS_ROUTE } from "constants/routes";
import { useAtlas } from "contexts/atlasContext";
import React, { useMemo } from "react";

export const Hero = (): JSX.Element => {
  const { atlas, network } = useAtlas();
  const { name: networkName, path: networkPath } = network;
  const { key: atlasKey, name: atlasName, path: atlasPath, subTitle } = atlas;

  const breadcrumbs = useMemo(
    () => [
      {
        path: NETWORKS_ROUTE,
        text: "HCA Biological Network Atlases",
      },
      {
        path: NETWORKS_ROUTE + "/" + networkPath,
        text: networkName,
      },
      {
        path: NETWORKS_ROUTE + "/" + networkPath + "/atlases/" + atlasPath,
        text: atlasKey,
      },
    ],
    [atlasKey, atlasPath, networkName, networkPath]
  );

  return (
    <BackPageHero
      breadcrumbs={breadcrumbs}
      subTitle={subTitle}
      title={atlasName}
    />
  );
};
