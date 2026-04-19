import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Typography } from "@mui/material";
import { JSX, ReactNode } from "react";

export interface KeyElTypeProps {
  children: ReactNode;
}

export const KeyElType = ({ children }: KeyElTypeProps): JSX.Element => {
  return (
    <Typography
      color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}
    >
      {children}
    </Typography>
  );
};
