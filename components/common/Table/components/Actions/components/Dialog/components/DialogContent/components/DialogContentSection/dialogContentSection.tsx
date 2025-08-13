import { Grid } from "@databiosphere/findable-ui/lib/components/common/Grid/grid";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

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
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_LARGE_500}>
        {title}
      </Typography>
      <Typography
        component="div"
        gutterBottom={false}
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400_2_LINES}
      >
        {children}
      </Typography>
    </Grid>
  );
};
