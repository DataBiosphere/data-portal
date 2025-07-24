import { Attribute } from "./types";
import {
  DataDictionary,
  Attribute as BaseAttribute,
} from "@databiosphere/findable-ui/lib/common/entities";
import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";

/**
 * Returns the displayable name `location.name` for a given attribute.
 * @param attribute - The attribute.
 * @returns The displayable name.
 */
export function buildLocationName(attribute: BaseAttribute): string {
  const { annotations } = attribute;
  const { annDataLocation } = annotations || {};

  // Return attribute name if no annDataLocation is found.
  if (!annDataLocation) return attribute.name;

  // Special case for X and raw.X or X if no normalized_expression_matrix.
  if (
    annDataLocation === "X" ||
    annDataLocation === "raw.X or X if no normalized_expression_matrix"
  ) {
    return attribute.name;
  }

  return `${annDataLocation ? `${annDataLocation}.` : ""}${attribute.name}`;
}

/**
 * Returns the source attribute for a given attribute.
 * @param dataDictionary - The data dictionary.
 * @param attribute - The attribute.
 * @returns The source attribute.
 */
export function buildSourceAttribute(
  dataDictionary: DataDictionary,
  attribute: BaseAttribute
): Attribute["source"] {
  const { annotations, prefixes } = dataDictionary;
  const attributeAnnotations = attribute.annotations;

  // Guard clause: if dataDictionary's annotations or prefixes are missing or empty, return none.
  if (
    !annotations ||
    !prefixes ||
    Object.keys(annotations).length === 0 ||
    Object.keys(prefixes).length === 0
  ) {
    return { children: LABEL.NONE, href: "" };
  }

  // Determine the key to use, either cxg or cap.
  const sourceKey = Object.keys(annotations).find(
    (key) => key === "cxg" || key === "cap"
  );
  if (!sourceKey) {
    return { children: LABEL.NONE, href: "" };
  }

  // Check for source
  if (
    annotations[sourceKey] &&
    prefixes[sourceKey] &&
    attributeAnnotations?.[sourceKey]
  ) {
    return {
      children: annotations[sourceKey],
      href: `${prefixes[sourceKey]}/#${attributeAnnotations[sourceKey]}`,
    };
  }

  // Default if neither CXG nor CAP is found, or if attribute has no relevant annotations
  return { children: LABEL.NONE, href: "" };
}
