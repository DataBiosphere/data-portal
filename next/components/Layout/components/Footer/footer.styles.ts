import { Footer as DXFooter } from "@databiosphere/findable-ui/lib/components/Layout/components/Footer/footer";
import { white } from "@databiosphere/findable-ui/lib/styles/common/mixins/colors";
import styled from "@emotion/styled";

export const AppFooter = styled(DXFooter)`
  padding: 24px 0;
`;

export const Footer = styled(AppFooter)`
  background-color: ${white};
` as typeof AppFooter;
