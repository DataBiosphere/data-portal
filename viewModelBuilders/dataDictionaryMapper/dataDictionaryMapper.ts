import { Attribute } from "./types";
import { DataDictionary } from "@databiosphere/findable-ui/lib/common/entities";
import {
  buildDataDictionaryRequiredAttribute as buildRequiredAttribute,
  buildDataDictionarySourceAttribute as buildSourceAttribute,
} from "./viewModelBuilders";

/**
 * Returns a data dictionary built from the given data dictionary.
 * @param dataDictionary - The data dictionary.
 * @returns The built data dictionary.
 */
export function buildDataDictionary(
  dataDictionary: DataDictionary
): DataDictionary<Attribute> {
  return {
    ...dataDictionary,
    classes: dataDictionary.classes.map((classData) => {
      return {
        ...classData,
        attributes: classData.attributes.map((attribute) => {
          return {
            ...attribute,
            required: buildRequiredAttribute(attribute),
            source: buildSourceAttribute(dataDictionary, attribute),
          };
        }),
      };
    }),
  };
}
