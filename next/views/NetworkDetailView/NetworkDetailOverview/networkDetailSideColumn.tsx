import { CoordinatorsSection } from "components/CoordinatorsSection/coordinatorsSection";
import { useNetwork } from "contexts/networkContext";
import React from "react";

export const NetworkDetailSideColumn = () => {
  const { coordinators, contact } = useNetwork();

  const coordinatorsNames = coordinators.map(({ fullName }) => fullName);

  return (
    <CoordinatorsSection
      title="Network Coordinators"
      email={contact.email}
      coordinators={coordinatorsNames}
    />
  );
};
