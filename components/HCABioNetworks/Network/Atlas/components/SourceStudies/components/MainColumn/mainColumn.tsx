import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { JSX } from "react";
import { useAtlas } from "../../../../../../../../contexts/atlasContext";
import { Table as TrackerSourceStudiesTable } from "./Table/tracker/table";

/**
 * Main column for the Source Studies tab.
 * @returns source studies content.
 */
export const MainColumn = (): JSX.Element => {
  const { trackerSourceStudies = [] } = useAtlas();
  return (
    <BackPageContentSingleColumn>
      <TrackerSourceStudiesTable data={trackerSourceStudies} />
    </BackPageContentSingleColumn>
  );
};
