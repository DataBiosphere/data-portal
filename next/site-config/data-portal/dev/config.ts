import { ELEMENT_ALIGNMENT } from "@clevercanary/data-explorer-ui/lib/common/entities";
import { SiteConfig } from "@clevercanary/data-explorer-ui/lib/config/entities";
import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import * as C from "../../../components/index";
import { socials } from "./constants";
import { themeOptions } from "./themeOptions";

const APP_TITLE = "HCA Data Portal";
export const HCA_DATA_COORDINATION_PLATFORM =
  "Human Cell Atlas Data Coordination Platform";
export const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";

const config: SiteConfig = {
  analytics: {
    gtmAuth: "eQWri5eLUCDkm5SvLIv8eQ", // GTM environment-specific
    gtmId: "GTM-M2J5NTJ",
    gtmPreview: "env-186",
  },
  appTitle: APP_TITLE,
  browserURL: "",
  dataSource: {
    defaultDetailParams: {
      catalog: "dcp32",
    },
    defaultListParams: {
      catalog: "dcp32",
      size: "200",
    },
    url: "https://service.azul.data.humancellatlas.org/index",
  },
  entities: [],
  explorerTitle: "",
  layout: {
    footer: {
      logos: [
        {
          alt: HCA_DATA_COORDINATION_PLATFORM,
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
      Logo: C.Logo({
        alt: HCA_DATA_COORDINATION_PLATFORM,
        height: 32,
        link: PORTAL_URL,
        src: logoHca,
      }),
      authenticationEnabled: false,
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
