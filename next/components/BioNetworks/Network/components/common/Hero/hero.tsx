import { BackPageHero } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import React, { useMemo } from "react";
import { NETWORKS_ROUTE } from "../../../../../../constants/routes";
import { useNetwork } from "../../../../../../contexts/networkContext";

export const Hero = (): JSX.Element => {
  const { network } = useNetwork();
  const { name, path } = network;

  const breadcrumbs = useMemo(
    () => [
      {
        path: NETWORKS_ROUTE,
        text: "Biological Networks",
      },
      {
        path: NETWORKS_ROUTE + "/" + path,
        text: name,
      },
    ],
    [name, path]
  );

  return <BackPageHero title={name} breadcrumbs={breadcrumbs} />;
};
