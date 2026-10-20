import { ButtonOutline as DXButtonOutline } from "@databiosphere/findable-ui/lib/components/common/Button/components/ButtonOutline/buttonOutline";
import type { ButtonProps } from "@mui/material";
import type { JSX } from "react";

/**
 * Outline button for dark backgrounds, rendering findable's ButtonOutline.
 * @param props - MUI button props.
 * @returns The outline button.
 */
export const ButtonOutline = (props: ButtonProps): JSX.Element => {
  return <DXButtonOutline {...props} />;
};
