import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  METADATA: "metadata",
};

export const METADATA: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.METADATA,
      layoutStyle: LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
      navigation: [{ label: "Metadata", url: ROUTES.METADATA }],
      slugs: [],
    },
  ],
};
