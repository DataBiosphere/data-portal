import type { RequirementLevel } from "./types";
import { Attribute, REQUIREMENT_LEVEL } from "./types";

const REQUIRED_INPUT = {
  STRONGLY_RECOMMENDED: "strongly recommended",
} as const;

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
 * @param required - The required value.
 * @returns The requirement level label.
 */
export function buildRequired(row: Attribute): RequirementLevel {
  const { required } = row;
  if (required === REQUIRED_INPUT.STRONGLY_RECOMMENDED)
    return REQUIREMENT_LEVEL.STRONGLY_RECOMMENDED;
  if (required) return REQUIREMENT_LEVEL.REQUIRED;
  return REQUIREMENT_LEVEL.RECOMMENDED;
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
