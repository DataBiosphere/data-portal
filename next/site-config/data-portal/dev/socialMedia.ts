import { SocialMedia } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import * as C from "../../../components/index";

export const SOCIALS = {
  FACEBOOK: {
    label: "Facebook",
    url: "https://www.facebook.com/humancellatlas",
  },
  GITHUB: {
    label: "GitHub",
    url: "https://github.com/HumanCellAtlas",
  },
  LINKEDIN: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/human-cell-atlas",
  },
  X: {
    label: "X",
    url: "https://twitter.com/humancellatlas",
  },
};

export const socialMedia: SocialMedia = {
  label: "Follow HCA",
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
