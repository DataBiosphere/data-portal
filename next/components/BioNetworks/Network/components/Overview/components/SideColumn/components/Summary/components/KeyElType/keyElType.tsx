import { TEXT_BODY_400 } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

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
