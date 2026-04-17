import { REQUIREMENT_LEVEL } from "@databiosphere/findable-ui/lib/common/entities";
import type { RequirementLabel } from "./types";
import { Attribute, REQUIREMENT_LABEL } from "./types";

/**
 * Accessor function for annDataLocation.
 * @param row - Original row data.
 * @returns AnnDataLocation row value.
 */
export function buildAnnDataLocation(row: Attribute): string[] {
  const originalValue = row.annotations?.annDataLocation;
  if (!originalValue) return [];
  // Split the annDataLocation string by ";" and trim each value.
  if (typeof originalValue === "string")
    return originalValue.split(";").map((s) => s.trim());
  throw new Error("AnnDataLocation must be a string");
}

/**
 * Maps a required input value to its display-level requirement label.
 * @param row - Row data.
 * @returns The requirement label.
 */
export function buildRequired(row: Attribute): RequirementLabel {
  const { required } = row;
  if (required === REQUIREMENT_LEVEL.STRONGLY_RECOMMENDED)
    return REQUIREMENT_LABEL.STRONGLY_RECOMMENDED;
  if (required === true) return REQUIREMENT_LABEL.REQUIRED;
  return REQUIREMENT_LABEL.RECOMMENDED;
}

/**
 * Accessor function for source.
 * @param row - Original row data.
 * @returns Source row value.
 */
export function buildTierNSource(row: Attribute) {
  const { source } = row;
  const { children } = source;

  // Return HCA if source is None.
  if (children === "None") return "HCA";

  // Return source otherwise.
  return source.children;
}
