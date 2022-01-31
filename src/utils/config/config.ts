/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal config.
 */

// App dependencies
import { Partner } from "../../components/searchPortal/searchPartner/searchPartner";
import { Social } from "../../components/social/social";
import { SOCIAL } from "../../components/social/social.model";
import { getCurrentEnvironmentURL } from "../environment/environment.service";

// Images
import github from "../../../images/socials/logo-github-primary.png";
// import githubWhite from "../../../images/socials/logo-github-white.png";
import slack from "../../../images/socials/logo-slack-primary.png";
import twitter from "../../../images/socials/logo-twitter-primary.png";
import twitterWhite from "../../../images/socials/logo-twitter-white.png";

export interface SearchConfig {
  partners: Partner[];
  searchEngineId?: string;
}

interface Config {
  searchConfig: SearchConfig;
  socials: Social[];
}

interface SiteConfig {
  hca: Config;
  lungmap: Config;
  portalUrl: string;
}

const Config: SiteConfig = {
  hca: {
    searchConfig: {
      partners: [
        { active: true, label: "All Results", value: "" },
        { active: false, label: "Projects", value: "projects" },
        { active: false, label: "Guides", value: "guides" },
        { active: false, label: "Pipeline Docs", value: "pipelines" },
        { active: false, label: "Metadata Schema", value: "metadata" },
      ],
      searchEngineId: process.env.GATSBY_ATLAS,
    },
    socials: [
      {
        imageSrc: twitter,
        name: SOCIAL.TWITTER,
        url: "https://twitter.com/humancellatlas",
      },
      {
        imageSrc: github,
        name: SOCIAL.GITHUB,
        url: "https://github.com/HumanCellAtlas",
      },
      {
        imageSrc: slack,
        name: SOCIAL.SLACK,
        url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
      },
    ],
  },
  lungmap: {
    searchConfig: {
      partners: [
        { active: true, label: "All Results", value: "" },
        { active: false, label: "Pipelines", value: "pipelines" },
        { active: false, label: "Metadata", value: "metadata" },
      ],
      searchEngineId: process.env.GATSBY_ATLAS,
    },
    socials: [
      {
        imageSrc: twitterWhite,
        name: SOCIAL.TWITTER,
        url: "https://twitter.com/lungmapnet",
      },
      // {
      //   imageSrc: githubWhite,
      //   name: SOCIAL.GITHUB,
      //   url: "https://github.com/HumanCellAtlas",
      // },
    ],
  },
  portalUrl: getCurrentEnvironmentURL() || "",
};

export default Config;
