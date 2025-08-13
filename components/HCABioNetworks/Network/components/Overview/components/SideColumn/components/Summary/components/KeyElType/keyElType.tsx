import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

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
