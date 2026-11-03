import { ROUTES } from "@/routes/constants";
import { FLATTEN } from "@/site-config/common/constants";
import { SOCIALS } from "@/site-config/data-portal/dev/socialMedia";
import { FacebookIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/FacebookIcon/facebookIcon";
import { GitHubIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { LinkedInIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/LinkedInIcon/linkedInIcon";
import { XIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/XIcon/xIcon";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import type { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";

/**
 * Header navigation items that also appear in the header's "More" menu: Updates and Follow HCA at the sm and md
 * breakpoints, and Help & Documentation's links at sm only.
 * Each item's visibility is set where it is used, in the site config.
 */

export const CONTACT_US: NavLinkItem = {
  label: "Contact Us",
  selectedMatch: SELECTED_MATCH.EQUALS,
  url: ROUTES.CONTACT,
};

export const FOLLOW_HCA: NavLinkItem = {
  label: "Follow HCA",
  menuItems: [
    {
      ...SOCIALS.GITHUB,
      icon: <GitHubIcon fontSize="small" />,
    },
    {
      ...SOCIALS.FACEBOOK,
      icon: <FacebookIcon fontSize="small" />,
    },
    {
      ...SOCIALS.X,
      icon: <XIcon fontSize="small" />,
    },
    {
      ...SOCIALS.LINKEDIN,
      icon: <LinkedInIcon fontSize="small" />,
    },
  ],
  url: "",
};

export const GET_HELP: NavLinkItem = {
  label: "Get Help",
  selectedMatch: SELECTED_MATCH.EQUALS,
  url: ROUTES.HELP,
};

export const HELP_AND_DOCUMENTATION: NavLinkItem = {
  label: "Help & Documentation",
  menuItems: [GET_HELP, CONTACT_US],
  url: "",
};

/**
 * Help & Documentation as it appears in the "More" menu, where its links are listed directly in "More".
 * findable-ui highlights "More" from its links' selected matches even when they are hidden, so the links match
 * nothing at md, where Help & Documentation is on the right of the header instead.
 */
export const MORE_HELP_AND_DOCUMENTATION: NavLinkItem = {
  ...HELP_AND_DOCUMENTATION,
  flatten: FLATTEN.MD_DOWN,
  menuItems: [
    { ...GET_HELP, selectedMatch: { md: false, sm: SELECTED_MATCH.EQUALS } },
    { ...CONTACT_US, selectedMatch: { md: false, sm: SELECTED_MATCH.EQUALS } },
  ],
};

export const UPDATES: NavLinkItem = {
  label: "Updates",
  url: ROUTES.DCP_UPDATES,
};
