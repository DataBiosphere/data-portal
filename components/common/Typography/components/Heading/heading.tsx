import { AnchorLink } from "@databiosphere/findable-ui/lib/components/common/AnchorLink/anchorLink";
import { Typography } from "@mui/material";
import { slugifyHeading } from "../../../../../plugins/common/utils";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export interface HeadingProps {
  enableAnchor?: boolean;
  headingValue: string;
}

export const Heading = ({
  enableAnchor = true,
  headingValue,
}: HeadingProps): JSX.Element => {
  return (
    <Typography
      component="h1"
      variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}
      sx={{ mb: 2, position: "relative" }}
    >
      {headingValue}
      {enableAnchor && <AnchorLink anchorLink={slugifyHeading(headingValue)} />}
    </Typography>
  );
};
