import { TypographyWordBreak } from "@databiosphere/findable-ui/lib/components/common/Typography/TypographyWordBreak/TypographyWordBreak";
import { Link as DXLink } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

/**
 * Basic anchor link component, used by MDX for all anchor links.
 * Takes in children and href as props, and passes them to the DXLink component.
 */

export const Link = ({
  ...props /* Spread props to allow for anchor link specific props e.g. "href". */
}): JSX.Element => {
  const { children, href } = props;
  return (
    <DXLink
      label={<TypographyWordBreak>{children}</TypographyWordBreak>}
      url={href}
    />
  );
};
