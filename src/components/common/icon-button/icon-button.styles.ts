import styled from "@emotion/styled";
import { IconButton as MIconButton } from "@mui/material";

// Socials icon button.
export const IconButtonSocials = styled(MIconButton)`
  color: ${({ theme }) => theme.palette.ink.light};

  &:hover {
    background-color: ${({ theme }) => theme.palette.smoke.light};
  }
` as typeof MIconButton;

// Ink icon button.
export const IconButtonInk = styled(MIconButton)`
  color: ${({ theme }) => theme.palette.ink.light};
` as typeof MIconButton;
