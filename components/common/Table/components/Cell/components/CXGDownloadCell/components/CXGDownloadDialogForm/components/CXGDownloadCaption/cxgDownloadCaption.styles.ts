import { textBody4002Lines } from "@databiosphere/findable-ui/lib/styles/common/mixins/fonts";
import styled from "@emotion/styled";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";

export const Caption = styled.div`
  ${textBody4002Lines};
  color: ${PALETTE.INK_LIGHT};
`;
