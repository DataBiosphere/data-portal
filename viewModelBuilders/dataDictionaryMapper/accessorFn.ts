import { Attribute } from "./types";

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
