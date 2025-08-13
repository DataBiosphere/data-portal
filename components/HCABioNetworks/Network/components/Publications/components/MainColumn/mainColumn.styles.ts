import { BackPageContentSingleColumn as DXBackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { HEADER_HEIGHT } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/constants";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const BackPageContentSingleColumn = styled(
  DXBackPageContentSingleColumn
)`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  ${bpUpSm} {
    gap: 40px;
    grid-template-columns: 1fr auto;
  }
`;

export const Publications = styled.div`
  display: grid;
  gap: 16px;

  sup {
    line-height: 0;
  }
`;

export const StyledTypography = styled(Typography)`
  margin: 0 16px;
  padding-top: 16px;
  scroll-margin-top: ${HEADER_HEIGHT}px;

  ${bpUpSm} {
    margin: 0;
  }
` as typeof Typography;
