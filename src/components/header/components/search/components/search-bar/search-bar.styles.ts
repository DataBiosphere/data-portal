import styled from "@emotion/styled";
import { Dialog, Input } from "@mui/material";

export const SearchBar = styled(Dialog)`
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  width: 100%;
`;

export const SearchForm = styled.form`
  align-items: center;
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 12px 16px;
`;

export const SearchInput = styled(Input)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.smoke.main};
  height: 40px;
  padding: 0;

  &&.Mui-focused ::placeholder {
    color: ${({ theme }) => theme.palette.ink.light};
    opacity: 1;
  }
`;
