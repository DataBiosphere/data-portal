import { CollapsableSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/CollapsableSection/collapsableSection";
import { Typography } from "@mui/material";
import React from "react";
import { useNetworkDescription } from "../../../contexts/networkContext";

export const NetworkDetailMainColumn = () => {
  const DescriptionComponent = useNetworkDescription();

  return (
    <CollapsableSection title="Network Description">
      <Typography>
        <DescriptionComponent />
      </Typography>
    </CollapsableSection>
  );
};
