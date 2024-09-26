import { primaryMain } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";

export const ResultsView = styled.div`
  display: grid;
  gap: 12px;

  .MuiPaper-root.MuiCard-root {
    h4 {
      color: ${primaryMain};
    }

    .MuiTypography-text-body-small-400 {
      word-break: break-word;
    }
  }
`;
