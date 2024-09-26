import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { ROUTES } from "../../../../routes/constants";
import { FLATTEN, VISIBLE } from "../../../common/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  GUIDES: "guides",
};

const PATH_SEGMENTS = {
  ACCESSING_ATLASES: "accessing-atlases",
  ACCESSING_METADATA_VIA_TDR: "accessing-metadata-via-tdr",
  CONSUMER_VIGNETTES: "consumer-vignettes",
  GUIDES: "guides",
  QUICK_START_GUIDE: "quick-start-guide",
  REQUESTING_ACCESS_TO_CONTROLLED_ACCESS_DATA:
    "requesting-access-to-controlled-access-data",
};

export const GUIDES: NavigationEntry = {
  nodes: [
    {
      flatten: FLATTEN.MD_DOWN,
      key: NODE_KEYS.GUIDES,
      label: "Guides",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "Exploring Projects",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: ROUTES.GUIDES,
        },
        {
          label: "Requesting Access to Controlled Access Data",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.REQUESTING_ACCESS_TO_CONTROLLED_ACCESS_DATA}`,
        },
        {
          label: "Exploring Biological Network and Atlas Data",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.ACCESSING_ATLASES}`,
        },
        {
          label: "Accessing HCA Data and Metadata",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.QUICK_START_GUIDE}`,
        },
        {
          label: "Exporting HCA Data to Terra",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONSUMER_VIGNETTES}/export-to-terra`,
        },
        {
          label: "Exploring Project Matrices",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONSUMER_VIGNETTES}/matrices`,
        },
        {
          label: "Accessing Metadata via TDR",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.ACCESSING_METADATA_VIA_TDR}`,
        },
      ],
      slugs: [
        PATH_SEGMENTS.ACCESSING_ATLASES,
        PATH_SEGMENTS.REQUESTING_ACCESS_TO_CONTROLLED_ACCESS_DATA,
        PATH_SEGMENTS.ACCESSING_METADATA_VIA_TDR,
        PATH_SEGMENTS.CONSUMER_VIGNETTES,
        PATH_SEGMENTS.GUIDES,
        PATH_SEGMENTS.QUICK_START_GUIDE,
      ],
      url: ROUTES.GUIDES,
      visible: VISIBLE.MD_DOWN,
    },
  ],
};
