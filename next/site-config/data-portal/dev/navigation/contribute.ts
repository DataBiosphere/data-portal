import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import { ROUTES } from "../../../../routes/constants";
import { FLATTEN, VISIBLE } from "../../../common/constants";
import { NavigationEntry, NavigationNode } from "./entities";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  CONTRIBUTE: "contribute",
};

export const CONTRIBUTE: NavigationEntry = {
  nodes: [
    {
      flatten: FLATTEN.MD_DOWN,
      key: NODE_KEYS.GUIDES,
      label: "Contribute",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "Contribute", url: ""
        },
        {
          label: "Overview",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: ROUTES.CONTRIBUTE,
        },
        {
          label: "Inclusion Criteria",
          url: `${ROUTES.CONTRIBUTE}/inclusion-criteria`,
        },
        {
          label: "Contributing Unpublished Data",
          url: `${ROUTES.CONTRIBUTE}/unpublished-data`,
        },
        {
          label: "Protecting Managed Access Data",
          url: `${ROUTES.CONTRIBUTE}/protecting-data`,
        },
        {
          label: "Submitting Metadata to Other Repositories",
          url: `${ROUTES.CONTRIBUTE}/submitting-metadata`,
        },
      ],
      slugs: ["contribute", "inclusion-criteria", "unpublished-data", "protecting-data", "submitting-metadata"],
      url: ROUTES.CONTRIBUTE,
      visible: VISIBLE.MD_DOWN,
    },
  ],
};
