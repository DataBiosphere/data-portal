import { Code as DXCode } from "@databiosphere/findable-ui/lib/components/common/Code/code";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";

export const Code = styled(DXCode)`
  border: 1px solid ${PALETTE.INFO_LIGHT};
  flex: none;
  margin: -4px 0 0 0;
  max-height: 72px;
  overflow: hidden;
  padding: 8px 16px;

  &::after {
    border-radius: 0;
  }
`;
