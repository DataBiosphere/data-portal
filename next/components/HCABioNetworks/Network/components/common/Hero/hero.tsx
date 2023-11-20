import { BackPageHero } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import React, { useMemo } from "react";
import { NETWORKS_ROUTE } from "../../../../../../constants/routes";
import { useNetwork } from "../../../../../../contexts/networkContext";
import { HeroTitle } from "../../../../../common/Hero/components/Title/components/HeroTitle/heroTitle";

export const Hero = (): JSX.Element => {
  const { network } = useNetwork();
  const { key, name, path } = network;

  const breadcrumbs = useMemo(
    () => [
      {
        path: NETWORKS_ROUTE,
        text: "HCA Biological Network Atlases",
      },
      {
        path: NETWORKS_ROUTE + "/" + path,
        text: name,
      },
    ],
    [name, path]
  );

  return (
    <BackPageHero
      title={<HeroTitle networkKey={key} title={name} />}
      breadcrumbs={breadcrumbs}
    />
  );
};
