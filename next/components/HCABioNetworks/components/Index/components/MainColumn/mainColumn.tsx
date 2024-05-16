import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import React from "react";
import { useNetworkList } from "../../../../../../hooks/useNetworkList";
import { getBioNetworksTableColumns } from "../../../../../../viewModelBuilders/viewModelBuilders";
import { DetailViewTable } from "./mainColumn.styles";

export const MainColumn = (): JSX.Element => {
  const networks = useNetworkList();
  return (
    <BackPageContentSingleColumn>
      <DetailViewTable
        columns={getBioNetworksTableColumns()}
        gridTemplateColumns="1fr max-content"
        items={networks}
        noResultsTitle={"No Networks"}
        Paper={FluidPaper}
        tools={null}
      />
    </BackPageContentSingleColumn>
  );
};
