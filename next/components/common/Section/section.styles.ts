import { SectionContent as DXSectionContent } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { textBody400 } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import { TABLET } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import styled from "@emotion/styled";

export const MDXSection = styled.div`
  padding: 20px 16px;

  ${({ theme }) => theme.breakpoints.up(TABLET)} {
    padding: 20px;
  }
`;

export const SectionContent = styled(DXSectionContent)`
  ${textBody400};
`;
