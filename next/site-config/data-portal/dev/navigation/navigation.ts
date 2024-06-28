import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationConfig, NAVIGATION_KEY } from "./entities";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
  guides: {
    nodes: [
      {
        key: NAVIGATION_KEY.GUIDES,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "Exploring Projects", url: ROUTES.GUIDES },
          {
            label: "Exploring Biological Network and Atlas Data",
            url: `${ROUTES.GUIDES}/accessing-atlases`,
          },
        ],
        slugs: [NAVIGATION_KEY.GUIDES, "accessing-atlases"],
      },
    ],
  },
};
