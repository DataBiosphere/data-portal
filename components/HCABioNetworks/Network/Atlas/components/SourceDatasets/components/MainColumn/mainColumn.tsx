import { useAtlas } from "@/contexts/atlasContext";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { JSX } from "react";
import { SourceDatasets } from "./sourceDatasets";

export const MainColumn = (): JSX.Element => {
  const { trackerSourceDatasets = [] } = useAtlas();
  return (
    <BackPageContentSingleColumn>
      <SourceDatasets data={trackerSourceDatasets} />
    </BackPageContentSingleColumn>
  );
};
