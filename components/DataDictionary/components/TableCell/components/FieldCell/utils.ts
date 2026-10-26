import { BIO_NETWORK_COUNT } from "@/components/DataDictionary/components/TableCell/components/DetailCell/constants";
import { COLUMN_IDENTIFIERS } from "@/viewModelBuilders/dataDictionaryMapper/columnIds";
import type {
  Attribute,
  RequirementLabel,
} from "@/viewModelBuilders/dataDictionaryMapper/types";
import { REQUIREMENT_LABEL } from "@/viewModelBuilders/dataDictionaryMapper/types";
import type { TitleProps } from "@databiosphere/findable-ui/lib/components/DataDictionary/components/Tooltip/components/Title/types";
import { CHIP_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/chip";
import type { ChipProps } from "@mui/material";
import type { Row } from "@tanstack/react-table";
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
 * Builds the requirement chip props and, for required fields that apply to only some bioNetworks, its tooltip.
 * Required chips are labelled "Required (All)" or "Required (N)", the number of bioNetworks.
 * @param row - Row.
 * @returns The chip props, and the tooltip title and description when the chip has a tooltip.
 */
export function buildRequired(row: Row<Attribute>): {
  chip: ChipProps;
  tooltip?: TitleProps;
} {
  const level = row.getValue<RequirementLabel>(COLUMN_IDENTIFIERS.REQUIRED);
  const chip: ChipProps = {
    color: REQUIREMENT_LABEL_COLOR[level],
    label: level,
    variant: CHIP_PROPS.VARIANT.STATUS,
  };
  if (level !== REQUIREMENT_LABEL.REQUIRED) return { chip };
  const bioNetworks = row.original.annotations?.bioNetworks;
  if (!Array.isArray(bioNetworks) || bioNetworks.length === BIO_NETWORK_COUNT)
    return { chip: { ...chip, label: `${level} (All)` } };
  const title = `Required for ${bioNetworks.length} of ${BIO_NETWORK_COUNT} BioNetworks`;
  const description = bioNetworks.join(", ");
  return {
    chip: {
      ...chip,
      // Screen readers announce the scope even when the tooltip is not open.
      "aria-label": `${title}: ${description}`,
      label: `${level} (${bioNetworks.length})`,
      tabIndex: 0,
    },
    tooltip: { description, title },
  };
}
