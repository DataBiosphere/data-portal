import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableContainer as MTableContainer } from "@mui/material";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

interface Props {
  borderless?: boolean;
  noWrap?: boolean;
}

export const TableContainer = styled(MTableContainer)`
  margin: 24px 0;

  .MuiTable-root {
    min-width: calc(390px - 32px);

    tr {
      td,
      th {
        border-bottom: 1px solid ${PALETTE.SMOKE_MAIN};
        padding: 12px;

        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }

      th {
        font: ${FONT.BODY_500};

        &:empty {
          padding: 0;
        }
      }

      td {
        font: ${FONT.BODY_400};
      }
    }
  }
`;

export const StyledTable = styled.div<Props>`
  ${({ borderless }) =>
    borderless &&
    css`
      && .MuiTable-root {
        tr {
          th,
          td {
            border: none;
          }
        }
      }
    `}
  ${({ noWrap }) =>
    noWrap &&
    css`
      && .MuiTable-root {
        tr {
          th,
          td {
            white-space: nowrap;
          }
        }
      }
    `}
`;
