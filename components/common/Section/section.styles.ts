import { SectionContent as DXSectionContent } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import styled from "@emotion/styled";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

export const MDXSection = styled.div`
  padding: 20px 16px;

  ${bpUpSm} {
    padding: 20px;
  }
`;

export const SectionContent = styled(DXSectionContent)`
  font: ${FONT.BODY_400};
`;
