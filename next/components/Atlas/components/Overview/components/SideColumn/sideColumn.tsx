import { useAtlas } from "contexts/atlasContext";
import React from "react";
import { Coordinators } from "../../../../../common/Section/components/Coordinators/coordinators";

export const SideColumn = (): JSX.Element => {
  const {
    atlas: { coordinators: atlasCoordinators },
    network: { contact: networkContact, coordinators: networkCoordinators },
  } = useAtlas();
  return (
    <>
      {/* Network Coordinators */}
      <Coordinators
        coordinators={networkCoordinators}
        email={networkContact.email}
        title={"Network Coordinators"}
      />
      {/* Atlas Coordinators */}
      <Coordinators
        coordinators={atlasCoordinators}
        title={"Atlas Coordinators"}
      />
    </>
  );
};
