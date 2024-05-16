import { Sections } from "@databiosphere/findable-ui/lib/components/common/Sections/sections";
import { useAtlas } from "contexts/atlasContext";
import React, { Fragment } from "react";
import { Coordinators } from "../../../../../../../common/Section/components/Coordinators/coordinators";
import { HCABiologicalNetwork } from "../../../../../../../common/Section/components/HCABiologicalNetwork/HCABiologicalNetwork";
import { Publications } from "../../../../../../../common/Section/components/Publications/publications";
import { References } from "../../../../../../../common/Section/components/References/references";
import { DataReleasePolicy } from "../../../common/DataReleasePolicy/dataReleasePolicy";

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
    <Fragment>
      <Sections>
        {/* HCA Biological Network Atlases */}
        <HCABiologicalNetwork network={network} />
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
      <Sections>
        {/* Data Release Policy */}
        <DataReleasePolicy />
      </Sections>
    </Fragment>
  );
};
