import { LogoProps } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/components/Logo/logo";
import {
  SOCIAL,
  Social,
} from "@clevercanary/data-explorer-ui/lib/components/common/Socials/socials";
import logoHca from "images/logoHca.png";

export const BROWSER_URL = "https://dev.singlecell.gi.ucsc.edu";

export const LOGO_ALT = "Human Cell Atlas Data Coordination Platform";

export const LOGO: LogoProps = {
  alt: "Human Cell Atlas Data Coordination Platform",
  height: 32,
  link: BROWSER_URL,
  src: logoHca,
};

export const socials: Social[] = [
  {
    ...SOCIAL.TWITTER,
    url: "https://twitter.com/humancellatlas",
  },
  {
    ...SOCIAL.GITHUB,
    url: "https://github.com/HumanCellAtlas",
  },
  {
    ...SOCIAL.SLACK,
    url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
  },
];
