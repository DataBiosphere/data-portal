import { ChipProps } from "@mui/material";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";

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
    label: isRequired ? "Required" : "Not Required",
    variant: "status",
  };
}
