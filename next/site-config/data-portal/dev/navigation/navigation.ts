import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { ROUTES } from "../../../../routes/constants";
import { NavigationConfig, NAVIGATION_KEY } from "./entities";
import { GUIDES } from "./guides";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
  apis: {
    nodes: [
      {
        key: NAVIGATION_KEY.APIS,
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "HCA Data Portal APIs", url: ROUTES.APIS },
          {
            label: "Data Browser API",
            url: `${ROUTES.APIS}/api-documentation/data-browser-api`,
          },
        ],
        slugs: [NAVIGATION_KEY.APIS, "data-browser-api"],
      },
    ],
  },
  guides: GUIDES,
};
