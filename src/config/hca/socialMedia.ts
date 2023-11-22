import { GitHubIcon } from "../../components/common/custom-icon/components/git-hub-icon/git-hub-icon";
import { FacebookIcon } from "../../components/common/custom-icon/components/facebook-icon/facebook-icon";
import { XIcon } from "../../components/common/custom-icon/components/x-icon/x-icon";
import { LinkedInIcon } from "../../components/common/custom-icon/components/linked-in-icon/linked-in-icon";
import { SocialMedia } from "../../components/header/common/entities";

const FACEBOOK_URL = "https://www.facebook.com/humancellatlas";
const GITHUB_URL = "https://github.com/HumanCellAtlas";
const LINKED_IN_URL = "https://www.linkedin.com/company/human-cell-atlas";
const X_URL = "https://twitter.com/humancellatlas";

export const socialMedia: SocialMedia = {
  label: "Follow HCA",
  socials: [
    {
      Icon: GitHubIcon,
      label: "GitHub",
      url: GITHUB_URL,
    },
    {
      Icon: FacebookIcon,
      label: "Facebook",
      url: FACEBOOK_URL,
    },
    {
      Icon: XIcon,
      label: "X",
      url: X_URL,
    },
    {
      Icon: LinkedInIcon,
      label: "LinkedIn",
      url: LINKED_IN_URL,
    },
  ],
};
