import { Footer as DXFooter } from "@databiosphere/findable-ui/lib/components/Layout/components/Footer/footer";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";

export const AppFooter = styled(DXFooter)`
  padding: 24px 0;
`;

export const Footer = styled(AppFooter)`
  background-color: ${PALETTE.COMMON_WHITE};
` as typeof AppFooter;
