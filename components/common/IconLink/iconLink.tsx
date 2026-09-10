import { isValidUrl } from "@databiosphere/findable-ui/lib/common/utils";
import {
  StaticImage,
  StaticImageProps,
} from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { isClientSideNavigation } from "@databiosphere/findable-ui/lib/components/Links/common/utils";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { visuallyHidden } from "@mui/utils";
import { JSX } from "react";
import { NEW_TAB_LABEL } from "./constants";
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
  // Derived from the same predicates `Link` uses to choose its target, so the
  // cue cannot disagree with where the link actually opens: internal URLs stay
  // in the same tab, valid external ones open a new one.
  const opensInNewTab = !isClientSideNavigation(url) && isValidUrl(url);
  return (
    <Stack className={className}>
      {/* Decorative: the adjacent link text already names the destination. */}
      <StaticImage alt="" height={height} src={icon} />
      <Link
        label={
          <>
            {label}
            {opensInNewTab && (
              <span style={visuallyHidden}>{NEW_TAB_LABEL}</span>
            )}
          </>
        }
        url={url}
      />
    </Stack>
  );
};
