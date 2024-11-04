import { SocialMedia } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../components/index";

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
      Icon: C.GitHubIcon,
    },
    {
      ...SOCIALS.FACEBOOK,
      Icon: C.FacebookIcon,
    },
    {
      ...SOCIALS.X,
      Icon: C.XIcon,
    },
    {
      ...SOCIALS.LINKEDIN,
      Icon: C.LinkedInIcon,
    },
  ],
};
