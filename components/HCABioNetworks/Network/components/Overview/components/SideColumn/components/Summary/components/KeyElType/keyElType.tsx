import { TEXT_BODY_400 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

export interface KeyElTypeProps {
  children: ReactNode;
}

export const KeyElType = ({ children }: KeyElTypeProps): JSX.Element => {
  return (
    <Typography color="ink.light" variant={TEXT_BODY_400}>
      {children}
    </Typography>
  );
};
