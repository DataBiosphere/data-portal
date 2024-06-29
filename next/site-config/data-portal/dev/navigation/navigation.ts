import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationConfig, NAVIGATION_KEY } from "./entities";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
  about: {
    nodes: [
      {
        key: NAVIGATION_KEY.ABOUT,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "About the HCA Data Portal", url: ROUTES.ABOUT },
          {
            label: "About the HCA",
            url: `${ROUTES.ABOUT}/hca`,
          },
          {
            label: "Attributions",
            url: `${ROUTES.ABOUT}/attributions`,
          },
          {
            label: "Data Use Agreement",
            url: `${ROUTES.ABOUT}/data-use-agreement`,
          },
        ],
        slugs: [
          NAVIGATION_KEY.ABOUT,
          "hca",
          "attributions",
          "data-use-agreement",
        ],
      },
    ],
  },
  apis: {
    nodes: [
      {
        key: NAVIGATION_KEY.APIS,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "HCA Data Portal APIs", url: ROUTES.APIS },
          {
            label: "Data Browser API",
            url: `${ROUTES.APIS}/api-documentation/data-browser-api`,
          },
        ],
        slugs: [NAVIGATION_KEY.APIS, "data-browser-api"],
      },
    ],
  },
  contribute: {
    nodes: [
      {
        key: NAVIGATION_KEY.CONTRIBUTE,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "Contributing Data", url: ROUTES.CONTRIBUTE },
          {
            label: "Data Suitability",
            url: `${ROUTES.CONTRIBUTE}/contributing-data-suitability`,
          },
          {
            label: "Data Submission Process",
            url: `${ROUTES.CONTRIBUTE}/contributing-expect-prepare`,
          },
          {
            label: "Data Processing and Results",
            url: `${ROUTES.CONTRIBUTE}/contributing-data-processing-results`,
          },
        ],
        slugs: [
          NAVIGATION_KEY.CONTRIBUTE,
          "contributing-data-suitability",
          "contributing-expect-prepare",
          "contributing-data-processing-results",
        ],
      },
    ],
  },
  "dcp-updates": {
    nodes: [
      {
        key: NAVIGATION_KEY.UPDATES,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "HCA Data Portal Platform Updates", url: ROUTES.UPDATES },
        ],
        slugs: [NAVIGATION_KEY.UPDATES],
      },
    ],
  },
  guides: {
    nodes: [
      {
        key: NAVIGATION_KEY.GUIDES,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "Exploring Projects", url: ROUTES.GUIDES },
          {
            label: "Exploring Biological Network and Atlas Data",
            url: `${ROUTES.GUIDES}/accessing-atlases`,
          },
          {
            label: "Accessing HCA Data and Metadata",
            url: `${ROUTES.GUIDES}/quick-start-guide`,
          },
          {
            label: "Exporting HCA Data to Terra",
            url: `${ROUTES.GUIDES}/consumer-vignettes/export-to-terra`,
          },
          {
            label: "Exploring Project Matrices",
            url: `${ROUTES.GUIDES}/consumer-vignettes/matrices`,
          },
          {
            label: "Accessing Metadata via TDR",
            url: `${ROUTES.GUIDES}/accessing-metadata-via-tdr`,
          },
        ],
        slugs: [
          NAVIGATION_KEY.GUIDES,
          "accessing-atlases",
          "quick-start-guide",
          "export-to-terra",
          "matrices",
          "accessing-metadata-via-tdr",
        ],
      },
    ],
  },
  privacy: {
    nodes: [
      {
        key: NAVIGATION_KEY.PRIVACY,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [{ label: "", url: ROUTES.PRIVACY }],
        slugs: [NAVIGATION_KEY.PRIVACY],
      },
    ],
  },
};
