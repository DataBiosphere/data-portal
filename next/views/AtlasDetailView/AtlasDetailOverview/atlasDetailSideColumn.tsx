import { CoordinatorsSection } from "components/CoordinatorsSection/coordinatorsSection";
import { useAtlas } from "contexts/atlasContext";
import React from "react";

export const AtlasDetailSideColumn = (): JSX.Element => {
  const {
    atlas: { coordinators: atlasCoordinators },
    network: { contact: networkContact, coordinators: networkCoordinators },
  } = useAtlas();

  const atlasCoordinatorsNames = atlasCoordinators.map(
    ({ fullName }) => fullName
  );

  const networkCoordinatorsNames = networkCoordinators.map(
    ({ fullName }) => fullName
  );

  return (
    <>
      <CoordinatorsSection
        title="Network Coordinators"
        email={networkContact.email}
        coordinators={networkCoordinatorsNames}
      />
      <CoordinatorsSection
        title="Atlas Coordinators"
        coordinators={atlasCoordinatorsNames}
      />
    </>
  );
};
