import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { bpDownSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { IconButton, Stack, Typography } from "@mui/material";

export const StyledGrid = styled("div")`
  align-items: flex-start;
  align-self: flex-start;
  display: grid;
  gap: 8px;
  grid-template-columns: auto 1fr;
  padding: 8px 0;

  ${bpDownSm} {
    padding: 0;
  }
`;

export const StyledStack = styled(Stack)`
  min-width: 0;
`;

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isExpanded",
})<{ isExpanded: boolean }>`
  color: ${PALETTE.INK_LIGHT};
  grid-column: 1;
  grid-row: 2;
  padding: 0;
  transform: rotate(${({ isExpanded }) => (isExpanded ? "90deg" : "0deg")});
  transition: transform 150ms ease;
`;

export const StyledTypography = styled(Typography)`
  grid-column: 2;

  a {
    line-height: 0;
  }

  &:hover {
    a {
      opacity: 1;
    }
  }
` as typeof Typography;
