import styled from "@emotion/styled";
import { DataDictionaryView } from "@databiosphere/findable-ui/lib/views/DataDictionaryView/dataDictionaryView";
import { textBody4002Lines } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";

export const StyledDataDictionaryView = styled(DataDictionaryView)`
  .MuiTableContainer-root {
    .MuiTable-root {
      .MuiTableBody-root {
        ${textBody4002Lines};
        .MuiTableCell-root {
          font: inherit;
          line-height: inherit;
        }
      }
    }
  }
`;
