import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import logoHca from "images/logoHca.png";
import logoHumanCellAtlas from "images/logoHumanCellAtlas.png";
import * as C from "../../../components/index";
import { ROUTES } from "../../../routes/constants";
import { SiteConfig } from "../../common/entities";
import { floating } from "./layout/floating";
import { socialMedia, SOCIALS } from "./socialMedia";
import { themeOptions } from "./themeOptions";

const APP_TITLE = "HCA Data Portal";
const CATALOG = "dcp40";
const DATA_URL = "https://service.azul.data.humancellatlas.org";
const EXPLORER_URL = "https://explore.data.humancellatlas.dev.clevercanary.com";
const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  dataUrl = DATA_URL,
  catalog = CATALOG
): SiteConfig {
  return {
    analytics: {
      gtmAuth: "eQWri5eLUCDkm5SvLIv8eQ", // GTM environment-specific
      gtmId: "GTM-M2J5NTJ",
      gtmPreview: "env-186",
    },
    appTitle: APP_TITLE,
    browserURL: browserUrl,
    dataSource: {
      defaultListParams: {
        size: "100",
      },
      defaultParams: {
        catalog,
      },
      url: `${dataUrl}/index`,
    },
    entities: [],
    explorerTitle: "",
    layout: {
      floating,
      footer: {
        Branding: C.Logo({
          alt: APP_TITLE,
          height: 38,
          link: "https://www.humancellatlas.org",
          src: logoHumanCellAtlas,
          target: ANCHOR_TARGET.BLANK,
        }),
        navLinks: [
          {
            label: "About",
            url: `${portalUrl}${ROUTES.ABOUT}`,
          },
          {
            label: "Help",
            url: `${portalUrl}${ROUTES.HELP}`,
          },
          {
            label: "Privacy",
            url: `${portalUrl}${ROUTES.PRIVACY}`,
          },
          {
            label: "Contact",
            url: `${portalUrl}${ROUTES.CONTACT}`,
          },
        ],
        socials: socialMedia.socials,
      },
      header: {
        authenticationEnabled: false,
        logo: C.Logo({
          alt: APP_TITLE,
          height: 32,
          link: portalUrl,
          src: logoHca,
        }),
        navigation: [
          [
            {
              label: "Datasets",
              target: ANCHOR_TARGET.BLANK,
              url: browserUrl,
            },
            {
              label: "HCA BioNetworks",
              url: ROUTES.HCA_BIONETWORKS,
            },
            {
              label: "Guides",
              url: `${portalUrl}${ROUTES.GUIDES}`,
            },
            {
              label: "Metadata",
              url: `${portalUrl}${ROUTES.METADATA}`,
            },
            {
              label: "APIs",
              url: `${portalUrl}${ROUTES.APIS}`,
            },
            {
              label: "Updates",
              url: `${portalUrl}${ROUTES.DCP_UPDATES}`,
            },
            {
              label: "Follow HCA",
              menuItems: [
                {
                  ...SOCIALS.GITHUB,
                  icon: C.GitHubIcon({ fontSize: "small" }),
                },
                {
                  ...SOCIALS.FACEBOOK,
                  icon: C.FacebookIcon({ fontSize: "small" }),
                },
                {
                  ...SOCIALS.X,
                  icon: C.XIcon({ fontSize: "small" }),
                },
                {
                  ...SOCIALS.LINKEDIN,
                  icon: C.LinkedInIcon({ fontSize: "small" }),
                },
              ],
              url: "",
              visible: { lg: false, sm: false, xs: false },
            },
          ],
          undefined,
          undefined,
        ],
        searchEnabled: true,
        searchURL: `${portalUrl}${ROUTES.SEARCH}`,
        socialMedia: socialMedia,
      },
    },
    portalURL: portalUrl,
    redirectRootToPath: "/",
    themeOptions,
  };
}

const config: SiteConfig = makeConfig(
  EXPLORER_URL,
  PORTAL_URL,
  DATA_URL,
  CATALOG
);

export default config;
