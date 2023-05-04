import { Box, IconButtonProps, SxProps, Theme } from "@mui/material";
import React, { ElementType } from "react";
import CustomIcon from "../../../common/custom-icon/custom-icon";
import { IconName } from "../../../common/custom-icon/common/icon-svg-path-shapes";
import { IconButtonSocials } from "../../../common/icon-button/icon-button.styles";
import { Target } from "../../../../utils/anchor/target.model";

export interface Social {
  type: IconName;
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
    <Box data-test-id="socials" display="flex" sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {socials.map(({ type, url }) => (
        <IconButtonElType
          key={type}
          href={url}
          rel="noopener"
          size={buttonSize}
          target={Target.BLANK}
        >
          <CustomIcon fontSize="small" iconName={type} />
        </IconButtonElType>
      ))}
    </Box>
  );
}
