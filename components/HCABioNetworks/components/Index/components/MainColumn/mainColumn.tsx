import { FluidPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { BackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { useNetworkList } from "../../../../../../hooks/useNetworkList";
import { getBioNetworksTableColumns } from "../../../../../../viewModelBuilders/viewModelBuilders";
import { DetailViewTable } from "./mainColumn.styles";
import { TABLE_OPTIONS } from "./constants";

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
        tableOptions={TABLE_OPTIONS}
        tools={null}
      />
    </BackPageContentSingleColumn>
  );
};
