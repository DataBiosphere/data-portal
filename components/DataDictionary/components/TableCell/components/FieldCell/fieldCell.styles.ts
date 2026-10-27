import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { bpDownSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import type { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

export const StyledGrid = styled("div")`
  align-items: flex-start;
  align-self: flex-start;
  display: grid;
  gap: 8px;
  grid-template-columns: auto 1fr;
  padding: 8px 0;

  ${bpDownSm} {
    grid-template-columns: auto;
    padding: 0;
  }
`;

export const StyledStack = styled(Stack)`
  min-width: 0;
`;

export const StyledKeyboardArrowRightRounded = styled(
  KeyboardArrowRightRounded,
  {
    shouldForwardProp: (prop) => prop !== "isExpanded",
  }
)<{ isExpanded: boolean }>`
  color: ${PALETTE.INK_LIGHT};
  grid-column: 1;
  grid-row: 2;
  transform: rotate(${({ isExpanded }) => (isExpanded ? "90deg" : "0deg")});
  transition: transform 150ms ease;

  ${bpDownSm} {
    display: none;
  }
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

  ${bpDownSm} {
    grid-column: 1;
  }
` as typeof Typography;

/**
 * Carries text into the accessible name without showing it. Spreads MUI's `visuallyHidden`
 * so the text stays in the accessibility tree. Cast because `visuallyHidden` is typed
 * `CSSProperties`, which emotion will not take as an interpolation directly.
 */
export const StyledVisuallyHidden = styled.span(visuallyHidden as CSSObject);
