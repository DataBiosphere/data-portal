import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const ResultsView = styled.div`
  display: grid;
  gap: 12px;

  .MuiPaper-root.MuiCard-root {
    h4 {
      color: ${PALETTE.PRIMARY_MAIN};
    }

    .MuiTypography-text-body-small-400 {
      word-break: break-word;
    }
  }
`;
