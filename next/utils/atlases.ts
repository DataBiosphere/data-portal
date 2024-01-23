import { AnalysisPortal, IntegratedAtlas } from "../@types/network";

const initAtlas: IntegratedAtlas = {
  analysisPortals: [],
  assay: [],
  cellCount: 0,
  datasetAssets: [],
  disease: [],
  name: "",
  organism: [],
  tissue: [],
};

/**
 * Returns "external" integrated atlas.
 * @param analysisPortals - Analysis portals.
 * @param assay - Assay (i.e. library construction method).
 * @param cellCount - Cell count.
 * @param disease - Disease.
 * @param name - Name.
 * @param organism - Organism.
 * @param tissue - Tissue.
 * @returns integrated atlas.
 */
export function buildAtlas(
  analysisPortals: AnalysisPortal[],
  assay: string[],
  cellCount: number,
  disease: string[],
  name: string,
  organism: string[],
  tissue: string[]
): IntegratedAtlas {
  return {
    ...initAtlas,
    analysisPortals,
    assay,
    cellCount,
    disease,
    name,
    organism,
    tissue,
  };
}
