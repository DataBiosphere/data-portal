import styled from "@emotion/styled";
import { DataDictionaryView } from "@databiosphere/findable-ui/lib/views/DataDictionaryView/dataDictionaryView";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

export const StyledDataDictionaryView = styled(DataDictionaryView)`
  .MuiTableContainer-root {
    .MuiTable-root {
      .MuiTableBody-root {
        font: ${FONT.BODY_400_2_LINES};
        .MuiTableCell-root {
          font: inherit;
          line-height: inherit;
        }
      }
    }
  }
`;
