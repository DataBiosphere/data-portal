import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import {
  AnalysisPortal,
  Atlas,
  CXGDataset,
  CXGDatasetAsset,
  CXG_DATASET_FILE_TYPE,
  DatasetAsset,
  IntegratedAtlas,
  Network,
} from "../@types/network";
import { processNullElements } from "../apis/azul/hca-dcp/common/utils";
import { config } from "../config/config";
import { CZ_CELLXGENE } from "../constants/analysisPortals";

const CZ_CELLXGENE_DATA_PORTAL_URL = "https://cellxgene.cziscience.com";

/**
 * Builds the CELLxGENE analysis portal for the given CELLxGENE URL.
 * @param cxgURL - CELLxGENE URL.
 * @returns CELLxGENE analysis portal.
 */
function buildCXGAnalysisPortal(cxgURL: string): AnalysisPortal {
  return { url: cxgURL, ...CZ_CELLXGENE };
}

/**
 * Builds the CELLxGENE data portal link for the given CELLxGENE dataset ID.
 * @param cxgId - CELLxGENE dataset ID.
 * @returns CELLxGENE data portal link.
 */
function buildCXGDataPortalLink(
  cxgId: string
): Pick<LinkProps, "label" | "url">[] {
  const cxgDataPortalURL = `${CZ_CELLXGENE_DATA_PORTAL_URL}/collections/${cxgId}`;
  return [
    {
      label: "CZ CELLxGENE Collection",
      url: cxgDataPortalURL,
    },
  ];
}

/**
 * Returns the H5AD and RDS dataset assets for the given CELLxGENE dataset assets.
 * @param cxgDatasetAssets - CELLxGENE dataset assets.
 * @returns H5AD and RDS dataset assets.
 */
function buildDatasetAssets(
  cxgDatasetAssets: CXGDatasetAsset[]
): DatasetAsset[] {
  return cxgDatasetAssets
    .filter(filterCXGDatasetAsset)
    .map((cxgDatasetAsset) => {
      return {
        downloadURL: cxgDatasetAsset.url,
        fileSize: cxgDatasetAsset.filesize,
        fileType: cxgDatasetAsset.filetype,
      };
    });
}

/**
 * Builds the URL for the dataset with filter values for the specimen organ category.
 * @param network - Network.
 * @returns dataset URL.
 */
export function buildDatasetURL(network: Network): string {
  const { browserURL } = config();
  const datasetURL = new URL(`${browserURL}/projects`);
  const filters = [
    { categoryKey: "specimenOrgan", value: network.datasetQueryOrgans },
  ];
  datasetURL.searchParams.set("filter", JSON.stringify(filters));
  return datasetURL.href;
}

/**
 * Fetches the CELLxGENE collections for the specified atlases and aggregates their datasets.
 * @param atlases - Atlases to get datasets for.
 * @returns CELLxGENE datasets.
 */
export async function fetchCXGDatasetsForAtlases(
  atlases: Atlas[]
): Promise<CXGDataset[]> {
  const cxgDatasets = [];
  for (const atlas of atlases) {
    if (atlas.cxgId) {
      const response = await fetch(
        `https://api.cellxgene.cziscience.com/curation/v1/collections/${atlas.cxgId}`
      );
      const cxgCollection = await response.json();
      cxgDatasets.push(
        ...mapDatasets(cxgCollection.datasets, cxgCollection.collection_id)
      );
    }
  }
  return cxgDatasets;
}

/**
 * Returns true if the dataset's collection_id matches the given collection ID.
 * @param cxgDataset - CELLxGENE dataset.
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
 * Returns true if the dataset asset's filetype is H5AD or RDS.
 * @param cxgDatasetAsset - CELLxGENE dataset asset.
 * @returns true if the dataset asset's filetype is H5AD or RDS.
 */
function filterCXGDatasetAsset(cxgDatasetAsset: CXGDatasetAsset): boolean {
  return (
    cxgDatasetAsset.filetype === CXG_DATASET_FILE_TYPE.H5AD ||
    cxgDatasetAsset.filetype === CXG_DATASET_FILE_TYPE.RDS
  );
}

/**
 * Processes the given atlas with the given CELLxGENE dataset responses.
 * @param atlas - Atlas.
 * @param cxgDatasets - CELLxGENE dataset responses.
 * @returns atlas with integrated atlases.
 */
export function processAtlas(atlas: Atlas, cxgDatasets: CXGDataset[]): Atlas {
  const integratedAtlases = cxgDatasets.map(mapIntegratedAtlas);
  if (atlas.componentAtlases) {
    integratedAtlases.push(...atlas.componentAtlases);
  }
  const cxgDataPortal = buildCXGDataPortalLink(atlas.cxgId);
  return { ...atlas, cxgDataPortal, integratedAtlases };
}

/**
 * Processes the given network with the given CELLxGENE dataset responses.
 * @param network - Network.
 * @param cxgDatasets - CELLxGENE dataset responses.
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
    if (atlas.componentAtlases) {
      integratedAtlases.push(...atlas.componentAtlases);
    }
    return { ...atlas, integratedAtlases };
  });
  const datasetURL = buildDatasetURL(network);
  return { ...network, atlases, datasetURL };
}

/**
 * Maps the given CELLxGENE dataset to an integrated atlas.
 * @param cxgDataset - CELLxGENE dataset.
 * @returns integrated atlas.
 */
export function mapIntegratedAtlas(cxgDataset: CXGDataset): IntegratedAtlas {
  return {
    analysisPortals: [buildCXGAnalysisPortal(cxgDataset.explorer_url)],
    assay: processArrayValue(cxgDataset.assay, "label"),
    cellCount: cxgDataset.cell_count,
    datasetAssets: buildDatasetAssets(cxgDataset.assets),
    disease: processArrayValue(cxgDataset.disease, "label"),
    name: cxgDataset.title,
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
  const setOfValues = new Set(
    values.map((value) => value[key] as unknown as string)
  );
  return processNullElements(sort([...setOfValues]));
}

/**
 * Sorts the given values in ascending order.
 * @param values - Values.
 * @returns values sorted.
 */
function sort(values: string[]): string[] {
  return values.sort((a, b) => a.localeCompare(b));
}

/**
 * Returns CELLxGENE datasets with the corresponding collection ID.
 * @param cxgDatasets - CELLxGENE dataset responses.
 * @param collection_id - Collection ID.
 * @returns CELLxGENE datasets.
 */
function mapDatasets(
  cxgDatasets: Omit<CXGDataset, "collection_id">[],
  collection_id: string
): CXGDataset[] {
  return cxgDatasets.map((cxgDataset) => ({ ...cxgDataset, collection_id }));
}
