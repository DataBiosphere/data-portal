import {
  DataDictionary,
  DataDictionaryConfig,
} from "@databiosphere/findable-ui/lib/common/entities";
import { FacebookIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/FacebookIcon/facebookIcon";
import { GitHubIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/GitHubIcon/gitHubIcon";
import { LinkedInIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/LinkedInIcon/linkedInIcon";
import { XIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/XIcon/xIcon";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { Logo } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Logo/logo";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { ROUTES } from "../../../routes/constants";
import { buildDataDictionary } from "../../../viewModelBuilders/dataDictionaryMapper/dataDictionaryMapper";
import {
  CELL_ANNOTATION_TABLE_OPTIONS,
  TIER_1_TABLE_OPTIONS,
  TIER_2_TABLE_OPTIONS,
} from "../../../viewModelBuilders/dataDictionaryMapper/tableOptions";
import { VISIBLE } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { buildMenuItems } from "./common/utils";
import cellAnnotation from "./dataDictionary/cell-annotation.json";
import metadataTier1 from "./dataDictionary/tier-1.json";
import metadataTier2 from "./dataDictionary/tier-2.json";
import { floating } from "./layout/floating";
import { APIS } from "./navigation/apis";
import { CONTRIBUTE } from "./navigation/contribute";
import { GUIDES } from "./navigation/guides";
import { socialMedia, SOCIALS } from "./socialMedia";
import { themeOptions } from "./themeOptions";

// This module is `.tsx` so branding and icon elements can be written as JSX.
// `Header.logo`, `Footer.Branding` and `MenuItem.icon` are all typed `ReactNode`
// in findable-ui, so they take an element rather than a component reference —
// unlike `Social.Icon` and `ComponentConfig.component`, which take the
// reference itself (see socialMedia.ts and layout/floating.ts).
//
// Build those elements with JSX, never by calling the component as a function.
// `makeConfig` runs at module evaluation, so `Logo({ … })` would execute the
// component body outside React's rendering cycle, with no component instance;
// any hook or context read added to `Logo` later would then fail, and point at
// this file rather than at the component. `<Logo … />` compiles to
// `createElement`, which only builds a descriptor — the body runs when React
// renders it. See #3217.

const APP_TITLE = "HCA Data Portal";
const CATALOG = "dcp60";
export const DATA_URL = "https://service.azul.data.humancellatlas.org";
const EXPLORER_URL = "https://explore.data.humancellatlas.dev.clevercanary.com";
export const GIT_HUB_REPO_URL = "https://github.com/DataBiosphere/data-portal";
const PORTAL_URL = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN || "";

export function makeConfig(
  browserUrl: string,
  portalUrl: string,
  dataUrl: string,
  gitHubUrl: string,
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
    dataDictionaries: [
      {
        dataDictionary: buildDataDictionary(
          metadataTier1 as unknown as DataDictionary
        ),
        path: "tier-1",
        tableOptions: TIER_1_TABLE_OPTIONS,
      },
      {
        dataDictionary: buildDataDictionary(
          metadataTier2 as unknown as DataDictionary
        ),
        path: "tier-2",
        tableOptions: TIER_2_TABLE_OPTIONS,
      },
      {
        dataDictionary: buildDataDictionary(
          cellAnnotation as unknown as DataDictionary
        ),
        path: "cell-annotation",
        tableOptions: CELL_ANNOTATION_TABLE_OPTIONS,
      },
    ] as unknown as DataDictionaryConfig[],
    dataSource: {
      defaultListParams: {
        size: "75",
      },
      defaultParams: {
        catalog,
      },
      url: `${dataUrl}/index`,
    },
    entities: [],
    gitHubUrl,
    layout: {
      floating,
      footer: {
        Branding: (
          <Logo
            alt={APP_TITLE}
            height={38}
            link="https://www.humancellatlas.org"
            src="/hca-bio-networks/logos/logoHumanCellAtlas.png"
            target={ANCHOR_TARGET.BLANK}
          />
        ),
        navLinks: [
          {
            label: "About",
            url: ROUTES.ABOUT,
          },
          {
            label: "Help",
            url: ROUTES.HELP,
          },
          {
            label: "Privacy",
            url: ROUTES.PRIVACY,
          },
          {
            label: "Contact",
            url: ROUTES.CONTACT,
          },
        ],
        socials: socialMedia.socials,
        versionInfo: true,
      },
      header: {
        authenticationEnabled: false,
        logo: (
          <Logo
            alt={APP_TITLE}
            height={32}
            link="/"
            src="/hca-bio-networks/logos/logoHca.png"
          />
        ),
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
              menuItems: buildMenuItems(GUIDES),
              url: ROUTES.GUIDES,
            },
            {
              label: "Metadata",
              menuItems: [
                {
                  label: "Metadata Overview",
                  selectedMatch: SELECTED_MATCH.EQUALS,
                  url: ROUTES.METADATA,
                },
                {
                  label: "Tier 1 Metadata",
                  selectedMatch: SELECTED_MATCH.EQUALS,
                  url: ROUTES.METADATA_TIER_1,
                },
                {
                  label: "Tier 2 Metadata",
                  selectedMatch: SELECTED_MATCH.EQUALS,
                  url: ROUTES.METADATA_TIER_2,
                },
                {
                  label: "Cell Annotation Metadata",
                  selectedMatch: SELECTED_MATCH.EQUALS,
                  url: ROUTES.METADATA_CELL_ANNOTATION,
                },
              ],
              url: "",
            },
            {
              label: "Contribute",
              menuItems: buildMenuItems(CONTRIBUTE),
              url: ROUTES.CONTRIBUTE,
            },
            {
              label: "APIs",
              menuItems: buildMenuItems(APIS),
              url: ROUTES.APIS,
            },
            {
              label: "Updates",
              url: ROUTES.DCP_UPDATES,
            },
            {
              label: "Follow HCA",
              menuItems: [
                {
                  ...SOCIALS.GITHUB,
                  icon: <GitHubIcon fontSize="small" />,
                },
                {
                  ...SOCIALS.FACEBOOK,
                  icon: <FacebookIcon fontSize="small" />,
                },
                {
                  ...SOCIALS.X,
                  icon: <XIcon fontSize="small" />,
                },
                {
                  ...SOCIALS.LINKEDIN,
                  icon: <LinkedInIcon fontSize="small" />,
                },
              ],
              url: "",
              visible: VISIBLE.BETWEEN_SM_AND_LG,
            },
          ],
          undefined,
          undefined,
        ],
        searchEnabled: true,
        searchURL: ROUTES.SEARCH,
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
  GIT_HUB_REPO_URL,
  CATALOG
);

export default config;
