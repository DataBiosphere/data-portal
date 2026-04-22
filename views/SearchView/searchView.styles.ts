import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";

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

    .MuiTypography-body-small-400 {
      word-break: break-word;
    }
  }
`;
