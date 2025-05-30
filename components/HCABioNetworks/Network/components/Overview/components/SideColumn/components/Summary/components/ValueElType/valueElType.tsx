import { TEXT_HEADING_SMALL } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

export interface ValueElTypeProps {
  children: ReactNode;
}

export const ValueElType = ({ children }: ValueElTypeProps): JSX.Element => {
  return (
    <Typography sx={{ order: -1 }} variant={TEXT_HEADING_SMALL}>
      {children}
    </Typography>
  );
};
