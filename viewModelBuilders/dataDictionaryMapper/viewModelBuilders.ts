import { Attribute } from "./types";
import {
  DataDictionary,
  Attribute as BaseAttribute,
} from "@databiosphere/findable-ui/lib/common/entities";
import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";

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
    return { label: LABEL.NONE, url: "" };
  }

  // Determine the key to use, either cxg or cap.
  const sourceKey = Object.keys(annotations).find(
    (key) => key === "cxg" || key === "cap"
  );
  if (!sourceKey) {
    return { label: LABEL.NONE, url: "" };
  }

  // Check for source
  if (
    annotations[sourceKey] &&
    prefixes[sourceKey] &&
    attributeAnnotations?.[sourceKey]
  ) {
    return {
      label: annotations[sourceKey],
      url: `${prefixes[sourceKey]}/#${attributeAnnotations[sourceKey]}`,
    };
  }

  // Default if neither CXG nor CAP is found, or if attribute has no relevant annotations
  return { label: LABEL.NONE, url: "" };
}
