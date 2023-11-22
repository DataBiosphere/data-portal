import { Box, IconButtonProps, SxProps, Theme } from "@mui/material";
import React, { ElementType, ReactNode } from "react";
import { IconButtonSocials } from "../../../common/icon-button/icon-button.styles";
import { Target } from "../../../../utils/anchor/target.model";

export interface Social {
  Icon: ElementType;
  label: ReactNode;
  url: string;
}

interface Props {
  buttonSize?: IconButtonProps["size"];
  IconButtonElType?: ElementType;
  socials: Social[];
  sx?: SxProps<Theme>;
}

export default function Socials({
  buttonSize = "medium",
  IconButtonElType = IconButtonSocials,
  socials,
  sx,
}: Props): JSX.Element {
  return (
    <Box
      data-testid="socials"
      display="flex"
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      {socials.map(({ Icon, url }, i) => (
        <IconButtonElType
          key={i}
          href={url}
          rel="noopener"
          size={buttonSize}
          target={Target.BLANK}
        >
          <Icon fontSize="small" />
        </IconButtonElType>
      ))}
    </Box>
  );
}
