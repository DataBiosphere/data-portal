import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const ViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1:hover a {
    opacity: 1;
  }

  .MuiPaper-root.MuiCard-root {
    h4 {
      color: ${PALETTE.PRIMARY_MAIN};
    }

    .MuiTypography-text-body-small-400 {
      word-break: break-word;
    }
  }
`;
