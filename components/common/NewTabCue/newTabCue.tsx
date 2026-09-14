import { isValidUrl } from "@databiosphere/findable-ui/lib/common/utils";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { isClientSideNavigation } from "@databiosphere/findable-ui/lib/components/Links/common/utils";
import type { JSX } from "react";
import { NEW_TAB_LABEL } from "./constants";
import { StyledSpan } from "./newTabCue.styles";
import type { Props } from "./types";

/**
 * Visually-hidden cue for a link that opens in a new tab, to be rendered
 * inside the link's label so it forms part of the accessible name. Mirrors
 * findable-ui `Link`'s own decision so the cue cannot disagree with where the
 * link actually opens: an explicit `target` wins, exactly as it does there,
 * and otherwise the URL decides - internal URLs stay in the same tab and get
 * nothing.
 * @param props - Component props.
 * @param props.target - The link's target, when it sets one explicitly.
 * @param props.url - The link's URL.
 * @returns the cue, or null when the link stays in the same tab.
 */
export const NewTabCue = ({ target, url }: Props): JSX.Element | null => {
  if (target === ANCHOR_TARGET.SELF) return null;
  if (target !== ANCHOR_TARGET.BLANK) {
    if (isClientSideNavigation(url) || !isValidUrl(url)) return null;
  }
  return <StyledSpan>{NEW_TAB_LABEL}</StyledSpan>;
};
