import { CollapsableSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/CollapsableSection/collapsableSection";
import { useAtlasContent } from "contexts/atlasContext";
import React from "react";

export const MainColumn = (): JSX.Element => {
  const { Description, Inclusion } = useAtlasContent();
  return (
    <>
      <CollapsableSection title="Atlas Description">
        <Description />
      </CollapsableSection>
      <CollapsableSection collapsable title="Inclusion criteria">
        <Inclusion />
      </CollapsableSection>
    </>
  );
};
