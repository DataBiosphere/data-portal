import { SiteConfig } from "../entities";
import logoHCA from "../../../images/hca/logoHCA.png";
import { breakpointTablet } from "../../theme/theme";
import { Target } from "../../utils/anchor/target.model";

// Template variables
export const BROWSER_URL = process.env.GATSBY_EXPLORE_URL;
const FONT_FAMILY_DIN = "'din-2014', sans-serif";
export const PORTAL_URL = process.env.GATSBY_PORTAL_URL;
export const PROJECTS_URL = "projects";

const config: SiteConfig = {
  layout: {
    header: {
      authenticationEnabled: false,
      logo: {
        alt: "HCA Data Portal",
        height: 32,
        link: `${PORTAL_URL}`,
        src: logoHCA,
      },
      navLinks: [
        {
          label: "Explore",
          target: Target.BLANK,
          url: `${BROWSER_URL}${PROJECTS_URL}`,
        },
        {
          label: "Guides",
          url: "/guides",
        },
        {
          label: "Metadata",
          url: "/metadata",
        },
        {
          label: "Contribute",
          url: "/contribute",
        },
        {
          label: "APIs",
          url: "/apis",
        },
        {
          label: "Updates",
          url: "/dcp-updates",
        },
      ],
      searchEnabled: true,
      slogan: undefined,
      socials: [
        {
          type: "twitter",
          url: "https://twitter.com/humancellatlas",
        },
        {
          type: "github",
          url: "https://github.com/HumanCellAtlas",
        },
        {
          type: "slack",
          url: "https://humancellatlas.slack.com/archives/C02TM2SDVM2",
        },
      ],
    },
  },
  search: {
    partners: [
      { label: "All Results", value: "" },
      { label: "Projects", value: "projects" },
      { label: "Guides", value: "guides" },
      { label: "Metadata Schema", value: "metadata" },
    ],
    searchEngineId: process.env.GATSBY_ATLAS,
    searchPath: "/search",
  },
  theme: {
    palette: {
      primary: {
        dark: "#005EA9",
        main: "#1C7CC7",
      },
    },
    typography: {
      "text-body-large-500": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 18,
        fontWeight: 600,
      },
      "text-heading": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 26,
          letterSpacing: "normal",
        },
      },
      "text-heading-large": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 26,
        fontWeight: 600,
        letterSpacing: "normal",
        lineHeight: "34px",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 32,
          letterSpacing: "normal",
        },
      },
      "text-heading-small": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 22,
          letterSpacing: "normal",
        },
      },
      "text-heading-xlarge": {
        fontFamily: FONT_FAMILY_DIN,
        fontSize: 32,
        fontWeight: 600,
        letterSpacing: "normal",
        [`@media (min-width: ${breakpointTablet}px)`]: {
          fontSize: 42,
          letterSpacing: "-0.4px",
        },
      },
    },
  },
};

export default config;
