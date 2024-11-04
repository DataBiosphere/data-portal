import { smokeMain } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import {
  textBody400,
  textBody500,
} from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TableContainer as MTableContainer } from "@mui/material";

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
        border-bottom: 1px solid ${smokeMain};
        padding: 12px;

        &:first-of-type {
          padding-left: 0;
        }

        &:last-of-type {
          padding-right: 0;
        }
      }

      th {
        ${textBody500};

        &:empty {
          padding: 0;
        }
      }

      td {
        ${textBody400};
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
