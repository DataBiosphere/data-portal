import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export interface ValueElTypeProps {
  children: ReactNode;
}

export const ValueElType = ({ children }: ValueElTypeProps): JSX.Element => {
  return (
    <Typography
      sx={{ order: -1 }}
      variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL}
    >
      {children}
    </Typography>
  );
};
