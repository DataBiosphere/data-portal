import { Attribute } from "./types";

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
