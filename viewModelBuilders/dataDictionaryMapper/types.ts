import { Attribute as BaseAttribute } from "@databiosphere/findable-ui/lib/common/entities";
import type { LinkProps } from "@mui/material";

export const REQUIREMENT_LABEL = {
  RECOMMENDED: "Recommended",
  REQUIRED: "Required",
  STRONGLY_RECOMMENDED: "Strongly Recommended",
} as const;

export type RequirementLabel =
  (typeof REQUIREMENT_LABEL)[keyof typeof REQUIREMENT_LABEL];

export interface Attribute extends BaseAttribute {
  locationName: string;
  source: LinkProps;
}
