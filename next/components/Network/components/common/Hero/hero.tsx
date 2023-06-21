import { BackPageHero } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/BackPage/components/BackPageHero/backPageHero";
import { NETWORKS_ROUTE } from "constants/routes";
import { useNetwork } from "contexts/networkContext";
import React, { useMemo } from "react";

export const Hero = (): JSX.Element => {
  const {
    network: { name, path },
  } = useNetwork();

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
