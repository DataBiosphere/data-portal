import { DetailViewTable as DXDetailViewTable } from "@databiosphere/findable-ui/lib/components/Detail/components/DetailViewTable/detailViewTable";
import styled from "@emotion/styled";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";

export const DetailViewTable = styled(DXDetailViewTable)`
  th {
    padding: 20px 16px;

    ${bpUpSm} {
      padding: 20px;
    }
  }

  td {
    padding: 18px 16px;

    ${bpUpSm} {
      padding: 18px 20px;
    }
  }
` as typeof DXDetailViewTable;
