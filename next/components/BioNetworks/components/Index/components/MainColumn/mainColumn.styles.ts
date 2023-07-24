import { DetailViewTable as DXDetailViewTable } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/DetailViewTable/detailViewTable";
import { TABLET } from "@clevercanary/data-explorer-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const DetailViewTable = styled(DXDetailViewTable)`
  th {
    padding: 20px 16px;

    ${({ theme }) => theme.breakpoints.up(TABLET)} {
      padding: 20px;
    }
  }

  td {
    padding: 18px 16px;

    ${({ theme }) => theme.breakpoints.up(TABLET)} {
      padding: 18px 20px;
    }
  }
` as typeof DXDetailViewTable;
