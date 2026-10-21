import type { PublicationResponse } from "@/apis/azul/hca-dcp/common/entities";
import { processNullElements } from "@/apis/azul/hca-dcp/common/utils";
import type { SourceStudyRow } from "@/types/network";
import { formatCellCount } from "./sourceStudies";

/**
 * Returns an external (non-HCA) dataset as a Source Studies table row. External
 * datasets have no Data Explorer page, so the row links to the publication, and
 * a dataset with no cell count reads "--".
 * @param disease - Disease.
 * @param estimatedCellCount - Estimated cell count.
 * @param genusSpecies - Genus species.
 * @param libraryConstructionApproach - Library construction approach.
 * @param organ - Organ.
 * @param projectTitle - Project title.
 * @param publication - Publication.
 * @returns source study row.
 */
export function buildDataset(
  disease: string[],
  estimatedCellCount: number,
  genusSpecies: string[],
  libraryConstructionApproach: string[],
  organ: string[],
  projectTitle: string,
  publication?: PublicationResponse
): SourceStudyRow {
  return {
    cellCount: formatCellCount(estimatedCellCount, "--"),
    diseases: processNullElements(disease),
    libraryConstructionMethods: processNullElements(
      libraryConstructionApproach
    ),
    organs: processNullElements(organ),
    species: processNullElements(genusSpecies),
    title: projectTitle,
    url: publication?.publicationUrl || "",
  };
}
