import { inkLight } from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/colors";
import {
  textHeadingLarge,
  textUppercase500,
} from "@clevercanary/data-explorer-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { Divider } from "@mui/material";

export const Section = styled.section`
  width: 100%;
`;

export const SectionHead = styled.h3`
  ${textHeadingLarge};
  font-size: 32px;
  line-height: 40px;
  margin: 0 auto;
  max-width: 816px;
  text-align: center;
`;

export const SectionOverline = styled.h4`
  ${textUppercase500};
  color: ${inkLight};
  text-align: center;
  margin: 0 0 8px;
`;

export const SectionDivider = styled(Divider)`
  margin: 0 auto;
  max-width: 1244px;
  width: calc(100% - 32px); // minus gutter.
`;
