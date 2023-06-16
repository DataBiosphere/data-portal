import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import { socials } from "./constants";

const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
export const LOGO_ALT = "Human Cell Atlas Data Coordination Platform";

const config: SiteConfig = {
  browserURL: "",
  dataSource: {
    url: "",
  },
  entities: [],
  explorerTitle: "",
  layout: {
    footer: {
      feedbackForm: false, // TODO feedback form
      logos: [
        {
          alt: LOGO_ALT,
          link: PORTAL_URL,
          height: 38,
          src: logoHumanCellAtlas,
        },
      ],
      navLinks: [
        {
          label: "About",
          url: `${PORTAL_URL}/about`,
        },
        {
          label: "Help",
          url: `${PORTAL_URL}/help`,
        },
        {
          label: "Privacy",
          url: `${PORTAL_URL}/privacy`,
        },
        {
          label: "Contact",
          url: `${PORTAL_URL}/contact`,
        },
      ],
      socials,
    },
    header: {
      authenticationEnabled: false,
      logo: { alt: LOGO_ALT, link: PORTAL_URL, src: logoHca, height: 32 },
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
      navLinks: [
        {
          label: "Explore",
          url: `${PORTAL_URL}/explore`,
        },
        {
          label: "BioNetworks",
          url: "/bio-networks",
        },
        {
          label: "Guides",
          url: `${PORTAL_URL}/guides`,
        },
        {
          label: "Metadata",
          url: `${PORTAL_URL}/metadata`,
        },
        {
          label: "Pipelines",
          url: `${PORTAL_URL}/pipelines`,
        },
        {
          label: "Analysis Tools",
          url: `${PORTAL_URL}/analyze`,
        },
        {
          label: "Contribute",
          url: `${PORTAL_URL}/contribute`,
        },
        {
          label: "APIs",
          url: `${PORTAL_URL}/apis`,
        },
        {
          label: "Updates",
          url: `${PORTAL_URL}/dcp-updates`,
        },
      ],
      searchEnabled: true,
      searchURL: `${PORTAL_URL}/search`,
      socials,
    },
  },
  redirectRootToPath: "/",
  themeOptions: {
    palette: {
      primary: {
        dark: "#005EA9",
        main: "#1C7CC7",
      },
    },
  },
};

export default config;
