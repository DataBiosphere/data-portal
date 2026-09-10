import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import type { JSX } from "react";
import { StyledNoWrap, StyledOpenInNewIcon } from "./citation.styles";
import { DOI_BASE_URL, EXTERNAL_LINK_TITLE } from "./constants";
import type { Props } from "./types";
import { splitTrailingWord } from "./utils";

/**
 * The source study citation. Links to the DOI when there is one, otherwise
 * renders as plain text - an external-link affordance on a link to nowhere
 * would be worse than none. Takes a required `publicationString`, so the
 * caller owns the "is there a citation at all?" question and the split only
 * runs on the branch that consumes it.
 * @param props - Component props.
 * @param props.doi - Source study DOI, if any.
 * @param props.publicationString - Source study citation.
 * @returns citation, linked to the DOI when one exists.
 */
export const Citation = ({ doi, publicationString }: Props): JSX.Element => {
  if (!doi) return <>{publicationString}</>;
  const { head, tail } = splitTrailingWord(publicationString);
  return (
    <Link
      // Text and icon are one label, so they are a single link target.
      label={
        <>
          {head}
          <StyledNoWrap>
            {tail}
            <StyledOpenInNewIcon
              fontSize={SVG_ICON_PROPS.FONT_SIZE.XXSMALL}
              titleAccess={EXTERNAL_LINK_TITLE}
            />
          </StyledNoWrap>
        </>
      }
      rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
      target={ANCHOR_TARGET.BLANK}
      // MUI `Link` defaults to `color="primary"` and findable-ui's theme does
      // not override it, so the wrapper's `ink.light` is ignored unless the
      // colour is set on the link itself.
      TypographyProps={{ color: TYPOGRAPHY_PROPS.COLOR.INK_LIGHT }}
      url={`${DOI_BASE_URL}${doi}`}
    />
  );
};
