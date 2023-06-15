import { CollapsableSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/CollapsableSection/collapsableSection";
import { Typography } from "@mui/material";
import { AtlasTable } from "components/AtlasTable/atlasTable";
import React from "react";
import {
  useNetwork,
  useNetworkDescription,
} from "../../../contexts/networkContext";

export const NetworkDetailMainColumn = (): JSX.Element => {
  const { atlases, path } = useNetwork();
  const DescriptionComponent = useNetworkDescription();

  return (
    <>
      <CollapsableSection title="Network Description">
        <Typography>
          <DescriptionComponent />
        </Typography>
      </CollapsableSection>
      <CollapsableSection title="Atlases">
        <AtlasTable atlases={atlases} networkPath={path} />
      </CollapsableSection>
    </>
  );
};
