import styled from "@emotion/styled";
import { Paper, Stack, Collapse } from "@mui/material";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { MarkdownCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/MarkdownCell/markdownCell";

export const StyledCell = styled("div")`
  align-self: flex-start;
  justify-items: flex-start;
  padding: 8px 0;

  .MuiTypography-gutterBottom {
    margin-bottom: 4px;
  }
`;

export const StyledMarkdownCell = styled(MarkdownCell)`
  min-width: 0;
` as typeof MarkdownCell;

export const StyledCollapse = styled(Collapse)`
  .MuiCollapse-wrapperInner {
    display: grid;
    gap: 16px;
    padding-top: 16px;
  }
`;

export const StyledStack = styled(Stack)`
  flex-wrap: wrap;
  gap: 4px 8px;
`;

export const StyledPaper = styled(Paper)`
  ${textBody400};
  background-color: ${PALETTE.SMOKE_LIGHT};
  box-shadow: 0 0 0 1px ${PALETTE.SMOKE_MAIN};
  font-family: "Roboto Mono", monospace;
  padding: 8px 12px;
`;
