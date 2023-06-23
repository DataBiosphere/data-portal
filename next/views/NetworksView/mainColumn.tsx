import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import { DetailViewTable } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/DetailViewTable/detailViewTable";
import React from "react";
import { useNetworkList } from "../../hooks/useNetworkList";
import { getNetworksTableColumns } from "../../viewModelBuilders/viewModelBuilders";

export const MainColumn = (): JSX.Element => {
  const networks = useNetworkList();
  return (
    <DetailViewTable
      columns={getNetworksTableColumns()}
      gridTemplateColumns="minmax(522px, 1fr) max-content" // TODO review gridTemplateColumns.
      items={networks}
      noResultsTitle={"No networks"}
      Paper={FluidPaper}
      tools={null}
    />
  );
};
