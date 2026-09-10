import { isValidUrl } from "@databiosphere/findable-ui/lib/common/utils";
import { isClientSideNavigation } from "@databiosphere/findable-ui/lib/components/Links/common/utils";
import { visuallyHidden } from "@mui/utils";
import type { JSX } from "react";
import { NEW_TAB_LABEL } from "./constants";
import type { Props } from "./types";

/**
 * Visually-hidden cue for a link that opens in a new tab, to be rendered
 * inside the link's label so it forms part of the accessible name. Decides
 * from the same predicates findable-ui's `Link` uses to choose its target -
 * internal URLs stay in the same tab and get nothing - so the cue cannot
 * disagree with where the link actually opens.
 * @param props - Component props.
 * @param props.url - The link's URL.
 * @returns the cue, or null when the link stays in the same tab.
 */
export const NewTabCue = ({ url }: Props): JSX.Element | null => {
  if (isClientSideNavigation(url) || !isValidUrl(url)) return null;
  return <span style={visuallyHidden}>{NEW_TAB_LABEL}</span>;
};
