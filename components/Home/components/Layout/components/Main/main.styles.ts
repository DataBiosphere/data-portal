import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main";
import styled from "@emotion/styled";

export const Main = styled(DXMain)`
  align-content: flex-start;
  background-color: ${({ theme }) => theme.palette.common.white};
  flex-wrap: wrap;
` as typeof DXMain;
