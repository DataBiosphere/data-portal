import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  DCP_UPDATES: "dcp-updates",
};

export const DCP_UPDATES: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.DCP_UPDATES,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "HCA Data Portal Platform Updates", url: ROUTES.DCP_UPDATES },
      ],
      slugs: [],
    },
  ],
};
