import { KeyValuePairs } from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { SectionTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Section/components/SectionTitle/sectionTitle";
import { GridPaperSection } from "@clevercanary/data-explorer-ui/lib/components/common/Section/section.styles";
import React, { Fragment } from "react";
import { Atlas } from "../../../../../@types/network";
import { getAtlasAnalysisPortals } from "../../../../../viewModelBuilders/viewModelBuilders";
import { KeyValueElType } from "./analysisPortals.styles";

export interface GridPaperSectionProps {
  atlas: Atlas;
}

export const AnalysisPortals = ({
  atlas,
}: GridPaperSectionProps): JSX.Element => {
  return (
    <GridPaperSection>
      <SectionTitle title="Analysis Portals" />
      <KeyValuePairs
        KeyValueElType={KeyValueElType}
        KeyElType={Fragment}
        keyValuePairs={getAtlasAnalysisPortals(atlas)}
        KeyValuesElType={Fragment}
        ValueElType={Fragment}
      />
    </GridPaperSection>
  );
};
