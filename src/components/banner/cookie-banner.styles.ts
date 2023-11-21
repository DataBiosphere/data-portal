import { Alert as MAlert } from "@mui/material";
import styled from "@emotion/styled";
import { BREAKPOINT } from "../../hooks/useBreakpointHelper";

export const Alert = styled(MAlert)`
  background-color: ${({ theme }) => theme.palette.common.black};
  bottom: 0;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  color: ${({ theme }) => theme.palette.common.white};
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

    a {
      color: inherit;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.up(BREAKPOINT.TABLET)} {
    flex-wrap: nowrap;

    .MuiAlert-message {
      .MuiButton-root {
        flex: none;
        margin-right: -8px;
      }
    }
  }
`;
