import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";
import type { ChipProps } from "@mui/material";
import type { Row } from "@tanstack/react-table";
import { COLUMN_IDENTIFIERS } from "../../../../../../viewModelBuilders/dataDictionaryMapper/columnIds";
import type {
  Attribute,
  RequirementLabel,
} from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { REQUIREMENT_LABEL_COLOR } from "./constants";

/**
 * Builds string array from the given attribute, for locationName.
 * @param row - Row.
 * @returns The location name string array.
 */
export function buildLocationName(row: Row<Attribute>): string[] {
  return row.original.locationName.split(";").map((value) => value.trim());
}

/**
 * Builds string from the given attribute, for range and multivalued.
 * @param attribute - The attribute.
 * @returns The range string.
 */
export function buildRange(attribute: Attribute): string {
  const { multivalued, range } = attribute;
  if (!multivalued) return range;
  return `${range} (multivalued)`;
}

/**
 * Builds ChipCell props from the given attribute, for required.
 * Only called when required is truthy (true or "strongly recommended").
 * @param row - Row.
 * @returns Model to be used as props for the Chip component.
 */
export function buildRequired(row: Row<Attribute>): ChipProps {
  const level = row.getValue<RequirementLabel>(COLUMN_IDENTIFIERS.REQUIRED);
  return {
    color: REQUIREMENT_LABEL_COLOR[level],
    label: level,
    variant: CHIP_PROPS.VARIANT.STATUS,
  };
}
