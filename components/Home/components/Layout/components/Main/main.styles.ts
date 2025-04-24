import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import styled from "@emotion/styled";

export const Main = styled(DXMain)`
  align-content: flex-start;
  background-color: ${PALETTE.COMMON_WHITE};
  flex-wrap: wrap;
` as typeof DXMain;
