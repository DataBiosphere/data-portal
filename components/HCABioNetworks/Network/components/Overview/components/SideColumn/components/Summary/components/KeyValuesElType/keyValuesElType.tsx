import { Grid } from "@databiosphere/findable-ui/lib/components/common/Grid/grid";
import React, { ReactNode } from "react";

export interface KeyValuesElTypeProps {
  children: ReactNode;
}

export const KeyValuesElType = ({
  children,
}: KeyValuesElTypeProps): JSX.Element => {
  return (
    <Grid gridSx={{ gap: 4, gridTemplateColumns: "1fr 1fr" }}>{children}</Grid>
  );
};
