import {
  Attribute as BaseAttribute,
  DataDictionary,
} from "@databiosphere/findable-ui/lib/common/entities";
import type { LinkProps } from "@mui/material";

export const REQUIREMENT_LEVEL = {
  RECOMMENDED: "Recommended",
  REQUIRED: "Required",
  STRONGLY_RECOMMENDED: "Strongly Recommended",
} as const;

export interface Attribute extends Omit<BaseAttribute, "required"> {
  locationName: string;
  required: RequiredValue;
  source: LinkProps;
}

export type AttributeInput = Omit<BaseAttribute, "required"> & {
  required: RequiredValue;
};

export type DataDictionaryInput = DataDictionary<AttributeInput>;

export type RequiredValue = boolean | "strongly recommended";

export type RequirementLevel =
  (typeof REQUIREMENT_LEVEL)[keyof typeof REQUIREMENT_LEVEL];
