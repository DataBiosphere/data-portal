import { TypographyWordBreak } from "@databiosphere/findable-ui/lib/components/common/Typography/TypographyWordBreak/TypographyWordBreak";
import { Link as DXLink } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { PARAMETERS } from "../../../../../../common/constants";
import { replaceParameters } from "../../../../../../common/utils";
import { useConfig } from "../../../../../../hooks/useConfig";

/**
 * Basic anchor link component, used by MDX for all anchor links.
 * Takes in children and href as props, and passes them to the DXLink component.
 */

export const Link = ({
  ...props /* Spread props to allow for anchor link specific props e.g. "href". */
}): JSX.Element => {
  const { children, href, ...linkProps } = props;
  const {
    config: { browserURL, portalURL },
  } = useConfig();
  return (
    <DXLink
      label={<TypographyWordBreak>{children}</TypographyWordBreak>}
      url={replaceParameters(href, {
        ...PARAMETERS,
        browserURL,
        portalURL,
      })}
      {...linkProps}
    />
  );
};
