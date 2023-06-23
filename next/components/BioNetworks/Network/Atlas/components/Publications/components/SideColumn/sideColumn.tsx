import { Sections } from "@clevercanary/data-explorer-ui/lib/components/common/Sections/sections";
import React from "react";
import { Coordinators } from "../../../../../../../common/Section/components/Coordinators/coordinators";

export const SideColumn = (): JSX.Element => {
  const coordinators = [{ fullName: "TODO" }];
  return (
    <Sections>
      {/* Network Coordinators */}
      <Coordinators
        coordinators={coordinators}
        title={"Network Coordinators"}
      />
      {/* Atlas Coordinators */}
      <Coordinators coordinators={coordinators} title={"Atlas Coordinators"} />
    </Sections>
  );
};
