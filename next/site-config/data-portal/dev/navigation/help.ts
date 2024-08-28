import { LAYOUT_STYLE_NO_CONTRAST_DEFAULT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  HELP: "help",
};

export const HELP: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.HELP,
      layoutStyle: LAYOUT_STYLE_NO_CONTRAST_DEFAULT,
      navigation: [{ label: "Help & FAQ", url: ROUTES.HELP }],
      slugs: [],
    },
  ],
};
