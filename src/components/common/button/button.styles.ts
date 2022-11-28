import styled from "@emotion/styled";
import { Button as MButton } from "@mui/material";
import { Button } from "./button";

// Primary button.
export const ButtonPrimary = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.palette.primary.dark};
  color: ${({ theme }) => theme.palette.common.white};
  flex: none;

  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }

  &:active {
    box-shadow: none;
  }

  &.Mui-disabled {
    color: ${({ theme }) => theme.palette.common.white};
    opacity: 0.5;
  }
` as typeof MButton;
