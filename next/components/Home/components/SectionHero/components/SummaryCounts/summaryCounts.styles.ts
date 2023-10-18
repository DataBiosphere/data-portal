import { mediaTabletUp } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/breakpoints";
import { white } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import {
  textBodyLarge400,
  textHeadingLarge,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const Metrics = styled.div`
  box-sizing: content-box;
  color: ${white};
  display: flex;
  flex-wrap: wrap;
  gap: 54px 64px;
  justify-content: space-between;
  margin: 44px auto 64px;
  max-width: 1024px;
  padding: 0 16px;

  ${mediaTabletUp} {
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

  ${mediaTabletUp} {
    flex-basis: unset;
  }
`;

export const Count = styled.div`
  ${textHeadingLarge};
  font-size: 32px;
  grid-column: 2;
  line-height: 40px;
`;

export const Label = styled.div`
  ${textBodyLarge400};
  grid-column: 2;
`;
