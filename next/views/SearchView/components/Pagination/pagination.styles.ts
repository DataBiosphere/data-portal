import styled from "@emotion/styled";

export const PaginationView = styled.div`
  align-items: center;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  justify-content: flex-start;
`;

export const PaginationActions = styled.div`
  display: grid;
  gap: 8px;
  grid-auto-flow: column;

  .MuiIconButton-root {
    padding: 8px;
  }
`;
