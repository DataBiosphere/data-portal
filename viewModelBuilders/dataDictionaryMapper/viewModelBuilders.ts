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

  if (!annotations?.cxg || !prefixes?.cxg || !attribute.annotations?.cxg) {
    return { label: LABEL.NONE, url: "" };
  }

  return {
    label: annotations.cxg,
    url: `${prefixes.cxg}/#${attribute.annotations.cxg}`,
  };
}
