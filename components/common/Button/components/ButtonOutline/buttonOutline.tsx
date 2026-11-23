import { BUTTON_PRESETS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/presets";
import type { ButtonProps } from "@mui/material";
import type { JSX } from "react";
import { StyledButton } from "./buttonOutline.styles";

/**
 * Outline button for dark backgrounds: transparent, with a white ring and white text.
 * @param props - MUI button props.
 * @returns The outline button.
 */
export const ButtonOutline = (props: ButtonProps): JSX.Element => {
  return <StyledButton {...BUTTON_PRESETS.SECONDARY_OUTLINED} {...props} />;
};
