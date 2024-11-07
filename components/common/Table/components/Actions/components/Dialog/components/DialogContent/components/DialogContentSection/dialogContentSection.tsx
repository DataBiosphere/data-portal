import { Grid } from "@databiosphere/findable-ui/lib/components/common/Grid/grid";
import {
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_LARGE_500,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

export interface DialogContentSectionProps {
  children: ReactNode;
  title: string;
}

export const DialogContentSection = ({
  children,
  title,
}: DialogContentSectionProps): JSX.Element => {
  return (
    <Grid gridSx={{ gap: 1 }}>
      <Typography variant={TEXT_BODY_LARGE_500}>{title}</Typography>
      <Typography
        component="div"
        gutterBottom={false}
        variant={TEXT_BODY_400_2_LINES}
      >
        {children}
      </Typography>
    </Grid>
  );
};
