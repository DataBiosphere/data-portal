import {
  Atlas,
  CXGDataset,
  CXGDatasetAsset,
  CXGDownloadURL,
  IntegratedAtlas,
  Network,
} from "../@types/network";
import {
  processEntityValue,
  processNullElements,
} from "../apis/azul/hca-dcp/common/utils";

export enum CXG_DATASET_FILE_TYPE {
  H5AD = "H5AD",
  RDS = "RDS",
}

/**
 * Builds the CellXGene H5AD and RDS download URLs for the given dataset.
 * @param cxgDataset - CellXGene dataset.
 * @returns CellXGene H5AD and RDS download URLs.
 */
function buildCXGDownloadURL(cxgDataset: CXGDataset): CXGDownloadURL {
  const H5ADAsset = findCXGDatasetAsset(cxgDataset, CXG_DATASET_FILE_TYPE.H5AD);
  const RDSAsset = findCXGDatasetAsset(cxgDataset, CXG_DATASET_FILE_TYPE.RDS);
  return {
    h5ad: getDownloadURL(H5ADAsset),
    rds: getDownloadURL(RDSAsset),
  };
}

/**
 * Returns true if the dataset's collection_id matches the given collection ID.
 * @param cxgDataset - CellXGene dataset.
 * @param collectionId - Collection ID.
 * @returns true if the dataset's collection_id matches the given collection ID.
 */
function filterCXGDataset(
  cxgDataset: CXGDataset,
  collectionId: string
): boolean {
  return cxgDataset.collection_id === collectionId;
}

/**
 * Returns the dataset asset with the given file type.
 * @param cxgDataset - CellXGene dataset.
 * @param fileType - File type.
 * @returns dataset asset with the given file type.
 */
function findCXGDatasetAsset(
  cxgDataset: CXGDataset,
  fileType: CXG_DATASET_FILE_TYPE
): CXGDatasetAsset | undefined {
  return cxgDataset.dataset_assets.find(
    ({ filetype }) => filetype === fileType
  );
}

/**
 * Returns the dataset URL for the given dataset asset.
 * @param cxgDatasetAsset - CellXGene dataset asset.
 * @returns dataset URL.
 */
function getDownloadURL(cxgDatasetAsset?: CXGDatasetAsset): string | null {
  if (!cxgDatasetAsset) {
    return null;
  }
  const { dataset_id, filetype } = cxgDatasetAsset;
  return `https://datasets.cellxgene.cziscience.com/${dataset_id}.${filetype.toLowerCase()}`;
}

/**
 * Processes the given atlas with the given CellXGene dataset responses.
 * @param atlas - Atlas.
 * @param cxgDatasets - CellXGene dataset responses.
 * @returns atlas with integrated atlases.
 */
export function processAtlas(atlas: Atlas, cxgDatasets: CXGDataset[]): Atlas {
  const integratedAtlases = cxgDatasets.map(mapIntegratedAtlas);
  return { ...atlas, integratedAtlases };
}

/**
 * Processes the given network with the given CellXGene dataset responses.
 * @param network - Network.
 * @param cxgDatasets - CellXGene dataset responses.
 * @returns network with integrated atlases.
 */
export function processNetwork(
  network: Network,
  cxgDatasets: CXGDataset[]
): Network {
  const atlases = [...network.atlases].map((atlas) => {
    const integratedAtlases = cxgDatasets
      .filter((dataset) => filterCXGDataset(dataset, atlas.cxgId))
      .map(mapIntegratedAtlas);
    return { ...atlas, integratedAtlases };
  });
  return { ...network, atlases };
}

/**
 * Maps the given CellXGene dataset to an integrated atlas.
 * @param cxgDataset - CellXGene dataset.
 * @returns integrated atlas.
 */
export function mapIntegratedAtlas(cxgDataset: CXGDataset): IntegratedAtlas {
  return {
    assay: processArrayValue(cxgDataset.assay, "label"),
    cellCount: cxgDataset.cell_count,
    cxgDownloadURL: buildCXGDownloadURL(cxgDataset),
    cxgId: cxgDataset.collection_id,
    cxgURL: processEntityValue(cxgDataset.dataset_deployments, "url"),
    disease: processArrayValue(cxgDataset.disease, "label"),
    name: cxgDataset.name,
    organism: processArrayValue(cxgDataset.organism, "label"),
    tissue: processArrayValue(cxgDataset.tissue, "label"),
  };
}

/**
 * Returns the unique string values of the given array object.
 * @param values - List of values.
 * @param key - Key of the value to extract.
 * @returns unique list of values.
 */
function processArrayValue<T>(values: T[], key: keyof T): string[] {
  const setOfValues = new Set(values.map((value) => value[key]));
  return processNullElements(sort([...setOfValues] as unknown as string[]));
}

/**
 * Sorts the given values in ascending order.
 * @param values - Values.
 * @returns values sorted.
 */
function sort(values: string[]): string[] {
  return values.sort((a, b) => a.localeCompare(b));
}
