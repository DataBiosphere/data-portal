import { StaticImage } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { TEXT_HEADING_LARGE } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React from "react";
import { NetworkKey } from "../../../../../../../@types/network";
import { NETWORK_ICONS } from "../../../../../../../constants/networks";
import { Title } from "./heroTitle.styles";

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
      <Typography color="ink.main" component="h1" variant={TEXT_HEADING_LARGE}>
        {title}
      </Typography>
    </Title>
  );
};
