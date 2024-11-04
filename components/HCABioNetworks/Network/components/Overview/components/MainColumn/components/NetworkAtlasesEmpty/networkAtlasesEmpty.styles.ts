import {
  Section as DXSection,
  SectionContent as DXSectionContent,
} from "@databiosphere/findable-ui/lib/components/common/Section/section.styles";
import { mediaTabletUp } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import styled from "@emotion/styled";

export const Section = styled(DXSection)`
  align-items: center;
  padding: 36px 16px;

  ${mediaTabletUp} {
    padding: 36px 20px;
  }
`;

export const SectionContent = styled(DXSectionContent)`
  .MuiTypography-root {
    text-align: center;
  }

  .MuiLink-root {
    color: inherit;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;
