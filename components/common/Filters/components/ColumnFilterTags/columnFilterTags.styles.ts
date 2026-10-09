import { bpDown1024 } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";

// Hidden at the same breakpoint the chip row collapses into the drawer (see
// columnFilters.styles.ts).
export const StyledGrid = styled(Grid)`
  .MuiChip-root:last-of-type {
    margin-right: 8px;
  }

  ${bpDown1024} {
    display: none;
  }
`;
