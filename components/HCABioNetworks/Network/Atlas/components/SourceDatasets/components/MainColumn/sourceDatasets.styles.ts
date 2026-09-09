import { bpDownSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { Box, styled } from "@mui/material";

export const StyledBox = styled(Box)`
  padding: 20px;

  ${bpDownSm} {
    padding: 20px 16px;
  }
`;
