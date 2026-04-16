import type { Attribute, DataDictionaryInput } from "./types";
import type { DataDictionary } from "@databiosphere/findable-ui/lib/common/entities";
import {
  buildAnnotations,
  buildLocationName,
  buildSourceAttribute,
} from "./viewModelBuilders";

/**
 * Returns a data dictionary built from the given data dictionary.
 * @param dataDictionary - The data dictionary.
 * @returns The built data dictionary.
 */
export function buildDataDictionary(
  dataDictionary: DataDictionaryInput
): DataDictionary<Attribute> {
  return {
    ...dataDictionary,
    classes: dataDictionary.classes.map((classData) => {
      return {
        ...classData,
        attributes: classData.attributes.map((attribute) => {
          return {
            ...attribute,
            annotations: buildAnnotations(attribute),
            locationName: buildLocationName(attribute),
            source: buildSourceAttribute(dataDictionary, attribute),
          };
        }),
      };
    }),
  };
}
