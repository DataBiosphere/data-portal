import { DetailViewTable as DXDetailViewTable } from "@databiosphere/findable-ui/lib/components/Detail/components/DetailViewTable/detailViewTable";
import { Table as DXTable } from "@databiosphere/findable-ui/lib/components/Detail/components/Table/table";
import { Toolbar as DXTToolbar } from "@databiosphere/findable-ui/lib/components/Table/components/TableToolbar/tableToolbar.styles";
import { white } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import { TABLET } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const Toolbar = styled(DXTToolbar)`
  &.MuiToolbar-table {
    background-color: ${white};
    padding: 20px 16px;

    ${({ theme }) => theme.breakpoints.up(TABLET)} {
      padding: 20px;
    }
  }
`;

export const Table = styled(DXTable)`
  td,
  th {
    padding: 14px 16px;

    ${({ theme }) => theme.breakpoints.up(TABLET)} {
      padding: 14px 20px;
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