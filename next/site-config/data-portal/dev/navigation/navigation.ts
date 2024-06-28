import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationConfig, NAVIGATION_KEY } from "./entities";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
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
};
