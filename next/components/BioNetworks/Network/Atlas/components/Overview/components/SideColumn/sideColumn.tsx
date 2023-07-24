import { Sections } from "@clevercanary/data-explorer-ui/lib/components/common/Sections/sections";
import { useAtlas } from "contexts/atlasContext";
import React from "react";
import { Coordinators } from "../../../../../../../common/Section/components/Coordinators/coordinators";
import { Publications } from "../../../../../../../common/Section/components/Publications/publications";
import { References } from "../../../../../../../common/Section/components/References/references";

export const SideColumn = (): JSX.Element => {
  const {
    atlas: {
      code,
      contact: atlasContact,
      coordinators: atlasCoordinators,
      publications,
    },
    network: { contact: networkContact, coordinators: networkCoordinators },
  } = useAtlas();
  return (
    <Sections>
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
