import { primaryMain } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
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
      color: ${primaryMain};
    }

    .MuiTypography-text-body-small-400 {
      word-break: break-word;
    }
  }
`;
