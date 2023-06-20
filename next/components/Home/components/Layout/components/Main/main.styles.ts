import { Main as DXMain } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main.styles";
import styled from "@emotion/styled";

export const Main = styled(DXMain)`
  align-content: flex-start;
  background-color: ${({ theme }) => theme.palette.common.white};
  flex-wrap: wrap;
`;
