import { Sections } from "@databiosphere/findable-ui/lib/components/common/Sections/sections";
import { useAtlas } from "contexts/atlasContext";
import { Fragment } from "react";
import { Coordinators } from "../../../../../../../common/Section/components/Coordinators/coordinators";
import { HCABiologicalNetwork } from "../../../../../../../common/Section/components/HCABiologicalNetwork/HCABiologicalNetwork";
import { Publications } from "../../../../../../../common/Section/components/Publications/publications";
import { References } from "../../../../../../../common/Section/components/References/references";
import { DataReleasePolicy } from "../../../common/DataReleasePolicy/dataReleasePolicy";

const BIOTURING_URL =
  "https://talk2data.bioturing.com/?tab=studies&version_id=hca&params=N4IgbgpgTgzglgewHYgFwgBYGMCGIC%2BQA";

export const SideColumn = (): JSX.Element => {
  const { atlas, network } = useAtlas();
  const {
    code,
    contact: atlasContact,
    coordinators: atlasCoordinators,
    cxgDataPortal = [],
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
        {/* Data Exploration Tools */}
        <References
          links={[
            ...cxgDataPortal,
            { label: "BioTuring Collection", url: BIOTURING_URL },
          ]}
          title="Data Exploration Tools"
        />
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
