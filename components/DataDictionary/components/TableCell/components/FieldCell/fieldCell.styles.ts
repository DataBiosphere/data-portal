import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { bpDownSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";

export const StyledGrid = styled(Grid)`
  align-self: flex-start;
  display: grid;
  gap: 8px;
  padding: 8px 0;

  ${bpDownSm} {
    padding: 0;
  }
`;

export const StyledTypography = styled(Typography)`
  a {
    line-height: 0;
  }

  &:hover {
    a {
      opacity: 1;
    }
  }
` as typeof Typography;
