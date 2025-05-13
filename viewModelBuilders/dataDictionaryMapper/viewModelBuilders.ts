import { Attribute } from "./types";
import { CHIP_PROPS } from "@databiosphere/findable-ui/src/styles/common/mui/chip";
import {
  DataDictionary as BaseDataDictionary,
  Attribute as BaseAttribute,
} from "@databiosphere/findable-ui/lib/common/entities";
import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";

/**
 * Returns the required attribute for a given attribute.
 * @param attribute - The attribute.
 * @returns The required attribute.
 */
export function buildDataDictionaryRequiredAttribute(
  attribute: BaseAttribute
): Attribute["required"] {
  const isRequired = Boolean(attribute.required);
  return {
    color: isRequired ? CHIP_PROPS.COLOR.ERROR : CHIP_PROPS.COLOR.DEFAULT,
    label: isRequired ? "Yes" : "No",
  };
}

/**
 * Returns the source attribute for a given attribute.
 * @param dataDictionary - The data dictionary.
 * @param attribute - The attribute.
 * @returns The source attribute.
 */
export function buildDataDictionarySourceAttribute(
  dataDictionary: BaseDataDictionary,
  attribute: BaseAttribute
): Attribute["source"] {
  const { annotations, prefixes } = dataDictionary;

  if (!annotations?.cxg || !prefixes?.cxg || !attribute.annotations?.cxg) {
    return { children: LABEL.NONE, href: "" };
  }

  return {
    children: annotations.cxg,
    href: `${prefixes.cxg}/#${attribute.annotations.cxg}`,
  };
}
