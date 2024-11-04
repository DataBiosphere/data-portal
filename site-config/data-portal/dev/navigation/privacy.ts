import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  PRIVACY: "privacy",
};

export const PRIVACY: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.PRIVACY,
      layoutStyle: LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
      navigation: [{ label: "", url: ROUTES.PRIVACY }],
      slugs: [],
    },
  ],
};
