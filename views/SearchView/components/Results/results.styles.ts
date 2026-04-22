import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";

export const ResultsView = styled.div`
  display: grid;
  gap: 12px;

  .MuiPaper-root.MuiCard-root {
    h4 {
      color: ${PALETTE.PRIMARY_MAIN};
    }

    .MuiTypography-body-small-400 {
      word-break: break-word;
    }
  }
`;
