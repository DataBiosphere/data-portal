import { Sections } from "@clevercanary/data-explorer-ui/lib/components/common/Sections/sections";
import { useAtlas } from "contexts/atlasContext";
import React from "react";
import { AnalysisPortals } from "../../../../../../../common/Section/components/AnalysisPortals/analysisPortals";
import { BiologicalNetwork } from "../../../../../../../common/Section/components/BiologicalNetwork/biologicalNetwork";
import { Coordinators } from "../../../../../../../common/Section/components/Coordinators/coordinators";
import { Publications } from "../../../../../../../common/Section/components/Publications/publications";
import { References } from "../../../../../../../common/Section/components/References/references";

export const SideColumn = (): JSX.Element => {
  const { atlas, network } = useAtlas();
  const {
    code,
    contact: atlasContact,
    coordinators: atlasCoordinators,
    publications,
  } = atlas;
  const { contact: networkContact, coordinators: networkCoordinators } =
    network;
  return (
    <Sections>
      {/* Biological Network */}
      <BiologicalNetwork network={network} />
      {/* Analysis Portals */}
      <AnalysisPortals atlas={atlas} />
      {/* Publications */}
      <Publications publications={publications} />
      {/* Code */}
      {code && <References links={code} title="Code" />}
      {/* Atlas Coordinators */}
      <Coordinators
        coordinators={atlasCoordinators}
        email={atlasContact.email}
        title={"Integration Lead"}
      />
      {/* Network Coordinators */}
      <Coordinators
        coordinators={networkCoordinators}
        email={networkContact.email}
        title={"Network Coordinators"}
      />
    </Sections>
  );
};
