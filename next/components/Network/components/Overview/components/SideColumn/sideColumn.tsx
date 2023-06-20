import { Sections } from "@clevercanary/data-explorer-ui/lib/components/common/Sections/sections";
import React from "react";
import { useNetwork } from "../../../../../../contexts/networkContext";
import { Coordinators } from "../../../../../common/Section/components/Coordinators/coordinators";

export const SideColumn = (): JSX.Element => {
  const {
    contact: { email },
    coordinators,
  } = useNetwork();
  return (
    <Sections>
      {/* Network Coordinators */}
      <Coordinators
        coordinators={coordinators}
        email={email}
        title={"Network Coordinators"}
      />
    </Sections>
  );
};
