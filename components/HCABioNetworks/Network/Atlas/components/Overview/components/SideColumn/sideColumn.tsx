import { Coordinators } from "@/components/common/Section/components/Coordinators/coordinators";
import { HCABiologicalNetwork } from "@/components/common/Section/components/HCABiologicalNetwork/HCABiologicalNetwork";
import { Publications } from "@/components/common/Section/components/Publications/publications";
import { References } from "@/components/common/Section/components/References/references";
import { DataReleasePolicy } from "@/components/HCABioNetworks/Network/Atlas/components/common/DataReleasePolicy/dataReleasePolicy";
import { useAtlas } from "@/contexts/atlasContext";
import { Sections } from "@databiosphere/findable-ui/lib/components/common/Sections/sections";
import { Fragment, JSX } from "react";
import { getDataExplorationTools } from "./utils";

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
  const references = getDataExplorationTools(atlas);
  return (
    <Fragment>
      <Sections>
        {/* HCA Biological Network Atlases */}
        <HCABiologicalNetwork network={network} />
        {/* Publications */}
        <Publications publications={publications} />
        {/* Code */}
        {code && <References links={code} title="Code" />}
        {/* Data Exploration Tools */}
        {references.length > 0 && (
          <References links={references} title="Data Exploration Tools" />
        )}
        {/* Atlas Coordinators */}
        <Coordinators
          coordinators={atlasCoordinators}
          email={atlasContact?.email}
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
