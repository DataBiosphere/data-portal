import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { ROUTES } from "../../../../routes/constants";
import { FLATTEN, VISIBLE } from "../../../common/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  APIS: "apis",
};

const PATH_SEGMENTS = { APIS: "apis", API_DOCUMENTATION: "api-documentation" };

export const APIS: NavigationEntry = {
  nodes: [
    {
      flatten: FLATTEN.MD_DOWN,
      key: NODE_KEYS.APIS,
      label: "APIs",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "HCA Data Portal APIs",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: ROUTES.APIS,
        },
        {
          label: "Data Browser API",
          url: `${ROUTES.APIS}/${PATH_SEGMENTS.API_DOCUMENTATION}/data-browser-api`,
        },
      ],
      slugs: [PATH_SEGMENTS.API_DOCUMENTATION, PATH_SEGMENTS.APIS],
      url: ROUTES.APIS,
      visible: VISIBLE.MD_DOWN,
    },
  ],
};
