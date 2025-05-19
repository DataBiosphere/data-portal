import styled from "@emotion/styled";
import { Grid, Paper, Stack } from "@mui/material";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";

export const StyledGrid = styled(Grid)`
  align-self: flex-start;
  display: grid;
  gap: 24px 0;
  justify-items: flex-start;
  padding: 8px 0;

  .MuiGrid-root {
    display: grid;
    gap: 4px;
  }
`;

export const StyledStack = styled(Stack)`
  flex-wrap: wrap;
  gap: 4px 8px;
`;

export const StyledPaper = styled(Paper)`
  ${textBody400};
  background-color: ${PALETTE.SMOKE_LIGHT};
  border: 1px solid ${PALETTE.SMOKE_MAIN};
  font-family: "Roboto Mono", monospace;
  padding: 8px 12px;
`;
