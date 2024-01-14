import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import * as C from "../../../components/index";
import { floating } from "./layout/floating";
import { socialMedia } from "./socialMedia";
import { themeOptions } from "./themeOptions";

const APP_TITLE = "HCA Data Portal";
const BROWSER_URL = "https://explore.data.humancellatlas.dev.clevercanary.com";
export const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";

const config: SiteConfig = {
  analytics: {
    gtmAuth: "eQWri5eLUCDkm5SvLIv8eQ", // GTM environment-specific
    gtmId: "GTM-M2J5NTJ",
    gtmPreview: "env-186",
  },
  appTitle: APP_TITLE,
  browserURL: BROWSER_URL,
  dataSource: {
    defaultListParams: {
      size: "100",
    },
    defaultParams: {
      catalog: "dcp34",
    },
    url: "https://service.azul.data.humancellatlas.org/index",
  },
  entities: [],
  explorerTitle: "",
  layout: {
    floating,
    footer: {
      Branding: C.Logo({
        alt: APP_TITLE,
        height: 38,
        link: "https://www.humancellatlas.org/",
        src: logoHumanCellAtlas,
        target: ANCHOR_TARGET.BLANK,
      }),
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
      socials: socialMedia.socials,
    },
    header: {
      Logo: C.Logo({
        alt: APP_TITLE,
        height: 32,
        link: PORTAL_URL,
        src: logoHca,
      }),
      authenticationEnabled: false,
      navAlignment: ELEMENT_ALIGNMENT.LEFT,
      navLinks: [
        {
          label: "Datasets",
          target: ANCHOR_TARGET.BLANK,
          url: BROWSER_URL,
        },
        {
          label: "HCA BioNetworks",
          url: "/hca-bio-networks",
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
      socialMedia: socialMedia,
    },
  },
  redirectRootToPath: "/",
  themeOptions,
};

export default config;
