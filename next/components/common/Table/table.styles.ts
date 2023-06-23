import { DetailViewTable as DXDetailViewTable } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/DetailViewTable/detailViewTable";
import { Table as DXTable } from "@clevercanary/data-explorer-ui/lib/components/Detail/components/Table/table";
import { TableToolbar as DXTableToolbar } from "@clevercanary/data-explorer-ui/lib/components/Table/table.styles";
import { TABLET } from "@clevercanary/data-explorer-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const TableToolbar = styled(DXTableToolbar)`
  padding: 20px 16px;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    padding: 20px;
  }
`;

export const Table = styled(DXTable)`
  td,
  th {
    padding: 20px 16px;

    ${({ theme }) => theme.breakpoints.up(TABLET)} {
      padding: 20px;
    }
  }
` as typeof DXTable;

export const DetailViewTable = styled(DXDetailViewTable)`
  td,
  th {
    padding: 20px 16px;

    ${({ theme }) => theme.breakpoints.up(TABLET)} {
      padding: 20px;
    }
  }
` as typeof DXDetailViewTable;
