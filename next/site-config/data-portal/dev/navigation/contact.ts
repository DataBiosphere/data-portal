import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  CONTACT: "contact",
};

const PATH_SEGMENTS = { CONTACT: "contact" };

export const CONTACT: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.CONTACT,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "Contact Us", url: ROUTES.CONTACT },
        {
          label: "Join the Discussion",
          url: `${ROUTES.CONTACT}/join-the-discussion`,
        },
      ],
      slugs: [PATH_SEGMENTS.CONTACT, "join-the-discussion"],
    },
  ],
};
