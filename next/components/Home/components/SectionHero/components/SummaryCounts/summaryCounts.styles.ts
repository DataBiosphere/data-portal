import {
  textBodyLarge400,
  textHeadingLarge,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";

export const Metrics = styled.div`
  box-sizing: content-box;
  color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  justify-content: space-between;
  margin: 32px auto;
  max-width: 1024px;
  padding: 0 16px;
`;

export const Metric = styled.div`
  display: grid;
  gap: 0 24px;

  .MuiDivider-root {
    grid-row: 1 / 3; // Spans count and label.
    opacity: 0.5;
  }
`;

export const Count = styled.div`
  ${textHeadingLarge}
  grid-column: 2;
`;

export const Label = styled.div`
  ${textBodyLarge400};
  grid-column: 2;
`;
