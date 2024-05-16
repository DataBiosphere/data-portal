import { BackPageContentSingleColumn as DXBackPageContentSingleColumn } from "@databiosphere/findable-ui/lib/components/Layout/components/BackPage/backPageView.styles";
import { HEADER_HEIGHT } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/constants";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { textHeadingSmall } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const BackPageContentSingleColumn = styled(
  DXBackPageContentSingleColumn
)`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  ${mediaTabletUp} {
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

export const Category = styled.h3`
  ${textHeadingSmall};
  margin: 0 16px;
  padding-top: 16px;
  scroll-margin-top: ${HEADER_HEIGHT}px;

  ${mediaTabletUp} {
    margin: 0;
  }
`;
