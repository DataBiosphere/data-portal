import { StaticImage } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Typography } from "@mui/material";
import { NetworkKey } from "../../../../../../../@types/network";
import { NETWORK_ICONS } from "../../../../../../../constants/networks";
import { Title } from "./heroTitle.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export interface HeroTitleProps {
  networkKey: NetworkKey;
  title: string;
}

export const HeroTitle = ({
  networkKey,
  title,
}: HeroTitleProps): JSX.Element => {
  return (
    <Title>
      <StaticImage alt={title} height={36} src={NETWORK_ICONS[networkKey]} />
      <Typography
        color={TYPOGRAPHY_PROPS.COLOR.INK_MAIN}
        component="h1"
        variant={TYPOGRAPHY_PROPS.VARIANT.HEADING_LARGE}
      >
        {title}
      </Typography>
    </Title>
  );
};
