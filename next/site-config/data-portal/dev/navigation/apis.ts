import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  APIS: "apis",
};

const PATH_SEGMENTS = { APIS: "apis", API_DOCUMENTATION: "api-documentation" };

export const APIS: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.APIS,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "HCA Data Portal APIs", url: ROUTES.APIS },
        {
          label: "Data Browser API",
          url: `${ROUTES.APIS}/${PATH_SEGMENTS.API_DOCUMENTATION}/data-browser-api`,
        },
      ],
      slugs: [PATH_SEGMENTS.API_DOCUMENTATION, PATH_SEGMENTS.APIS],
    },
  ],
};
