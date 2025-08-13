import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { Typography } from "@mui/material";

export const Metrics = styled.div`
  box-sizing: content-box;
  color: ${PALETTE.COMMON_WHITE};
  display: flex;
  flex-wrap: wrap;
  gap: 54px 64px;
  justify-content: space-between;
  margin: 44px auto 64px;
  max-width: 1024px;
  padding: 0 16px;

  ${bpUpSm} {
    gap: unset;
    margin: 40px auto;
  }
`;

export const Metric = styled.div`
  display: grid;
  gap: 0 24px;
  flex-basis: calc(50% - 32px); // minus gutter.
  justify-content: flex-start;

  .MuiDivider-root {
    grid-row: 1 / 3; // Spans count and label.
    opacity: 0.5;
  }

  ${bpUpSm} {
    flex-basis: unset;
  }
`;

export const Count = styled(Typography)`
  font-size: 32px;
  grid-column: 2;
  line-height: 40px;
`;

export const Label = styled(Typography)`
  grid-column: 2;
`;
