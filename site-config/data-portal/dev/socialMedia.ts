import { FacebookIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/FacebookIcon/facebookIcon";
import { GitHubIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { LinkedInIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/LinkedInIcon/linkedInIcon";
import { XIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/XIcon/xIcon";
import { SocialMedia } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";

export const SOCIALS = {
  FACEBOOK: {
    label: "Facebook",
    target: ANCHOR_TARGET.BLANK,
    url: "https://www.facebook.com/humancellatlas",
  },
  GITHUB: {
    label: "GitHub",
    target: ANCHOR_TARGET.BLANK,
    url: "https://github.com/HumanCellAtlas",
  },
  LINKEDIN: {
    label: "LinkedIn",
    target: ANCHOR_TARGET.BLANK,
    url: "https://www.linkedin.com/company/human-cell-atlas",
  },
  X: {
    label: "X",
    target: ANCHOR_TARGET.BLANK,
    url: "https://twitter.com/humancellatlas",
  },
};

export const socialMedia: SocialMedia = {
  socials: [
    {
      ...SOCIALS.GITHUB,
      Icon: GitHubIcon,
    },
    {
      ...SOCIALS.FACEBOOK,
      Icon: FacebookIcon,
    },
    {
      ...SOCIALS.X,
      Icon: XIcon,
    },
    {
      ...SOCIALS.LINKEDIN,
      Icon: LinkedInIcon,
    },
  ],
};
