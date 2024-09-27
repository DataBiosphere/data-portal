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
          label: "Contribute",
          url: "",
        },
        {
          label: "Contributing Data to the Human Cell Atlas",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: ROUTES.CONTRIBUTE,
        },
        {
          label:
            "Submitting Count Matrices and Tier 1 Metadata to CELLxGENE Discover",
          url: `${ROUTES.CONTRIBUTE}/submitting-hca-data-to-cellxgene-discover`,
        },
        {
          label:
            "Submitting Cell Annotation Metadata to the Cell Annotation Platform (CAP)",
          url: `${ROUTES.CONTRIBUTE}/submitting-cell-annotation-metadata-to-cap`,
        },
        {
          label:
            "Submitting FASTQs and Tier 2 metadata to the HCA Data Repository",
          url: `${ROUTES.CONTRIBUTE}/submitting-fastqs-and-tier-2-metadata-to-the-hca-data-repository`,
        },
      ],
      slugs: [
        "contribute",
        "submitting-hca-data-to-cellxgene-discover",
        "submitting-cell-annotation-metadata-to-cap",
        "submitting-fastqs-and-tier-2-metadata-to-the-hca-data-repository",
      ],
      url: ROUTES.CONTRIBUTE,
      visible: VISIBLE.MD_DOWN,
    },
  ],
};
