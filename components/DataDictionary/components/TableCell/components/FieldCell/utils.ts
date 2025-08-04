import { ChipProps } from "@mui/material";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";
import { Row } from "@tanstack/react-table";

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
 * @param attribute - The attribute.
 * @returns Model to be used as props for the Chip component.
 */
export function buildRequired(attribute: Attribute): ChipProps {
  const isRequired = Boolean(attribute.required);
  return {
    color: isRequired ? CHIP_PROPS.COLOR.ERROR : CHIP_PROPS.COLOR.DEFAULT,
    label: isRequired ? "Required" : "Recommended",
    variant: "status",
  };
}
