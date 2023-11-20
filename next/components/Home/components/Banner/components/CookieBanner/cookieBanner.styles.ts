import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { white } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import { elevation02 } from "@clevercanary/data-explorer-ui/lib/theme/common/shadows";
import styled from "@emotion/styled";
import { Alert as MAlert } from "@mui/material";

export const Alert = styled(MAlert)`
  background-color: ${({ theme }) => theme.palette.common.black};
  bottom: 0;
  box-shadow: ${elevation02};
  color: ${white};
  flex-wrap: wrap;
  gap: 16px;
  left: 0;
  margin: 24px;
  padding: 8px 16px;
  position: fixed;
  width: calc(100% - 48px);
  z-index: 1000;

  .MuiAlert-message {
    display: contents;

    .MuiTypography-text-body-400 {
      align-self: center;
      flex-basis: 100%;
    }

    .MuiLink-root {
      color: inherit;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  ${mediaTabletUp} {
    flex-wrap: nowrap;

    .MuiAlert-message {
      .MuiButton-root {
        margin-right: -8px;
      }
    }
  }
`;
