import { SocialMedia } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import * as C from "../../../components/index";

const FACEBOOK_URL = "https://www.facebook.com/humancellatlas";
const GITHUB_URL = "https://github.com/HumanCellAtlas";
const LINKED_IN_URL = "https://www.linkedin.com/company/human-cell-atlas";
const X_URL = "https://twitter.com/humancellatlas";

export const socialMedia: SocialMedia = {
  label: "Follow HCA",
  socials: [
    {
      Icon: C.GitHubIcon,
      label: "GitHub",
      url: GITHUB_URL,
    },
    {
      Icon: C.FacebookIcon,
      label: "Facebook",
      url: FACEBOOK_URL,
    },
    {
      Icon: C.XIcon,
      label: "X",
      url: X_URL,
    },
    {
      Icon: C.LinkedInIcon,
      label: "LinkedIn",
      url: LINKED_IN_URL,
    },
  ],
};
