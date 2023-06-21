import { Card } from "@clevercanary/data-explorer-ui/lib/components/common/Card/card";
import { Grid } from "@clevercanary/data-explorer-ui/lib/components/common/Grid/grid";
import { FluidPaper } from "@clevercanary/data-explorer-ui/lib/components/common/Paper/paper.styles";
import React from "react";

export const MainColumn = (): JSX.Element => {
  return (
    <Grid gridSx={{ gap: 4 }}>
      <Card Paper={FluidPaper} secondaryTitle="TODO" title="Publication" />
    </Grid>
  );
};
