import { SectionContent as DXSectionContent } from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";
import { bpUpSm } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const MDXSection = styled.div`
  padding: 20px 16px;

  ${bpUpSm} {
    padding: 20px;
  }
`;

export const SectionContent = styled(DXSectionContent)`
  font: ${FONT.BODY_400};
`;
