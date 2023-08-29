import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import { socials } from "./constants";
import { themeOptions } from "./themeOptions";

const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";
export const LOGO_ALT = "Human Cell Atlas Data Coordination Platform";

const config: SiteConfig = {
  analytics: {
    gtmAuth: "eQWri5eLUCDkm5SvLIv8eQ", // GTM environment-specific
    gtmId: "GTM-M2J5NTJ",
    gtmPreview: "env-186",
  },
  browserURL: "",
  dataSource: {
    defaultDetailParams: {
      catalog: "dcp30",
    },
    defaultListParams: {
      catalog: "dcp30",
      size: "200",
    },
    url: "https://service.azul.data.humancellatlas.org/index",
  },
  entities: [],
  explorerTitle: "",
  layout: {
    footer: {
      feedbackForm: false, // TODO feedback form
      logos: [
        {
          alt: LOGO_ALT,
          height: 38,
          link: PORTAL_URL,
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
      logo: { alt: LOGO_ALT, height: 32, link: PORTAL_URL, src: logoHca },
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
  themeOptions,
};

export default config;
