import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  ABOUT: "about",
};

const PATH_SEGMENTS = {
  ABOUT: "about",
  ATTRIBUTIONS: "attributions",
  DATA_USE_AGREEMENT: "data-use-agreement",
  HCA: "hca",
};

export const ABOUT: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.ABOUT,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "About the HCA Data Portal", url: ROUTES.ABOUT },
        {
          label: "About the HCA",
          url: `${ROUTES.ABOUT}/${PATH_SEGMENTS.HCA}`,
        },
        {
          label: "Attributions",
          url: `${ROUTES.ABOUT}/${PATH_SEGMENTS.ATTRIBUTIONS}`,
        },
        {
          label: "Data Use Agreement",
          url: `${ROUTES.ABOUT}/${PATH_SEGMENTS.DATA_USE_AGREEMENT}`,
        },
      ],
      slugs: [
        PATH_SEGMENTS.ABOUT,
        PATH_SEGMENTS.ATTRIBUTIONS,
        PATH_SEGMENTS.DATA_USE_AGREEMENT,
        PATH_SEGMENTS.HCA,
      ],
    },
  ],
};
