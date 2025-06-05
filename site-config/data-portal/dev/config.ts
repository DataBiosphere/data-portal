import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../../components/index";
import { ROUTES } from "../../../routes/constants";
import { VISIBLE } from "../../common/constants";
import { SiteConfig } from "../../common/entities";
import { buildMenuItems } from "./common/utils";
import { floating } from "./layout/floating";
import { APIS } from "./navigation/apis";
import { CONTRIBUTE } from "./navigation/contribute";
import { GUIDES } from "./navigation/guides";
import { socialMedia, SOCIALS } from "./socialMedia";
import { themeOptions } from "./themeOptions";
import cellAnnotationSchemaAnnData from "./dataDictionary/cell-annotation-schema-ann-data.json";
import tier1SchemaAnnData from "./dataDictionary/tier-1-schema-ann-data.json";
import tier2SchemaHcaDataRepository from "./dataDictionary/tier-2-schema-hca-data-repository.json";
import { COLUMN_DEFS } from "../../../viewModelBuilders/dataDictionaryMapper/columnDefs";
import { buildDataDictionary } from "../../../viewModelBuilders/dataDictionaryMapper/dataDictionaryMapper";
import { DataDictionaryConfig } from "@databiosphere/findable-ui/lib/common/entities";
import { TABLE_OPTIONS } from "../../../viewModelBuilders/dataDictionaryMapper/tableOptions";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";

const APP_TITLE = "HCA Data Portal";
const CATALOG = "dcp50";
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
    dataSource: {
      defaultListParams: {
        size: "100",
      },
      defaultParams: {
        catalog,
      },
      url: `${dataUrl}/index`,
    },
    dataDictionaries: [
      {
        columnDefs: COLUMN_DEFS,
        dataDictionary: buildDataDictionary(tier1SchemaAnnData),
        path: "tier-1-schema-ann-data",
        tableOptions: TABLE_OPTIONS,
      },
      {
        columnDefs: COLUMN_DEFS,
        dataDictionary: buildDataDictionary(tier2SchemaHcaDataRepository),
        path: "tier-2-schema-hca-data-repository",
        tableOptions: TABLE_OPTIONS,
      },
      {
        columnDefs: COLUMN_DEFS,
        dataDictionary: buildDataDictionary(cellAnnotationSchemaAnnData),
        path: "cell-annotation-schema-ann-data",
        tableOptions: TABLE_OPTIONS,
      },
    ] as unknown as DataDictionaryConfig[],
    entities: [],
    explorerTitle: "",
    gitHubUrl,
    layout: {
      floating,
      footer: {
        Branding: C.Logo({
          alt: APP_TITLE,
          height: 38,
          link: "https://www.humancellatlas.org",
          src: "/hca-bio-networks/logos/logoHumanCellAtlas.png",
          target: ANCHOR_TARGET.BLANK,
        }),
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
        logo: C.Logo({
          alt: APP_TITLE,
          height: 32,
          link: "/",
          src: "/hca-bio-networks/logos/logoHca.png",
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
                  label: "Tier 1 Schema (AnnData)",
                  selectedMatch: SELECTED_MATCH.EQUALS,
                  url: ROUTES.METADATA_TIER_1_SCHEMA_ANN_DATA,
                },
                {
                  label: "Tier 2 Schema (HCA Data Repository)",
                  selectedMatch: SELECTED_MATCH.EQUALS,
                  url: ROUTES.METADATA_TIER_2_SCHEMA_HCA_DATA_REPOSITORY,
                },
                {
                  label: "Cell Annotation Schema (AnnData)",
                  selectedMatch: SELECTED_MATCH.EQUALS,
                  url: ROUTES.METADATA_CELL_ANNOTATION_SCHEMA_ANN_DATA,
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
