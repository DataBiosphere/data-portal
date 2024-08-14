import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
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
};

export const GUIDES: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.GUIDES,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "Exploring Projects", url: ROUTES.GUIDES },
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
        PATH_SEGMENTS.ACCESSING_METADATA_VIA_TDR,
        PATH_SEGMENTS.CONSUMER_VIGNETTES,
        PATH_SEGMENTS.GUIDES,
        PATH_SEGMENTS.QUICK_START_GUIDE,
      ],
    },
  ],
};
