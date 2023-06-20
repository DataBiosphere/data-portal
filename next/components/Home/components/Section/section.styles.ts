import { textHeadingLarge } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled/dist/emotion-styled.cjs";

export const Section = styled.section`
  width: 100%;
`;

export const SectionContent = styled.div`
  padding: 0 16px;
`;

export const SectionHeadline = styled.div`
  margin: 0 auto;
  max-width: 816px;
  text-align: center;

  h2 {
    ${textHeadingLarge};
    margin: 0;
  }
`;
