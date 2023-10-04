import {
  StaticImage,
  StaticImageProps,
} from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { Link } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";
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
      <StaticImage alt={label} height={height} src={icon} />
      <Link label={label} url={url} />
    </Stack>
  );
};
