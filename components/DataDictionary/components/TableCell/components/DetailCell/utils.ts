import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";

/**
 * Build example string array from the given attribute.
 * @param attribute - The attribute.
 * @returns The example string array.
 */
export function buildExample(attribute: Attribute): string[] {
  if (!attribute.example) return [];
  return attribute.example.split(";").map((value) => value.trim());
}
