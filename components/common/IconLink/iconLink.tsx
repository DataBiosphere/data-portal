import {
  StaticImage,
  StaticImageProps,
} from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { JSX } from "react";
import { NewTabCue } from "../NewTabCue/newTabCue";
import { Stack } from "./iconLink.styles";

export interface IconLinkProps {
  className?: string;
  height?: StaticImageProps["height"];
  icon: StaticImageProps["src"];
  label: string;
  url: string;
}

export const IconLink = ({
  className,
  height = 24,
  icon,
  label,
  url,
}: IconLinkProps): JSX.Element => {
  return (
    <Stack className={className}>
      {/* Decorative: the adjacent link text already names the destination. */}
      <StaticImage alt="" height={height} src={icon} />
      <Link
        label={
          <>
            {label}
            <NewTabCue url={url} />
          </>
        }
        url={url}
      />
    </Stack>
  );
};
