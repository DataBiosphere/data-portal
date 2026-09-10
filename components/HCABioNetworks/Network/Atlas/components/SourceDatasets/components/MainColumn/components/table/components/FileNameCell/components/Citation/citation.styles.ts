import { OpenInNewIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/OpenInNewIcon/openInNewIcon";
import styled from "@emotion/styled";

/**
 * Holds the citation's final word and the external-link icon on one line. A
 * browser may break before an atomic inline box, which would otherwise strand
 * the icon on a line of its own when the citation wraps.
 */
export const StyledNoWrap = styled.span`
  white-space: nowrap;
`;

/**
 * External-link affordance for the citation line. Inline so it flows with the
 * citation text and shares its colour via `currentColor`. The size is set with
 * the `fontSize` prop at the call site rather than here: the theme's
 * `MuiSvgIcon-fontSizeXsmall` variant wins over a `font-size` declaration in
 * this block, so styling it here silently has no effect.
 */
export const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  margin-left: 4px;
  vertical-align: middle;
`;
