import { AnchorLink } from "@databiosphere/findable-ui/lib/components/common/AnchorLink/anchorLink";
import { TEXT_HEADING_LARGE } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import { slugifyHeading } from "../../../../../plugins/common/utils";

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
      variant={TEXT_HEADING_LARGE}
      sx={{ mb: 2, position: "relative" }}
    >
      {headingValue}
      {enableAnchor && <AnchorLink anchorLink={slugifyHeading(headingValue)} />}
    </Typography>
  );
};
