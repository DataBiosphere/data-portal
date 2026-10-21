import {
  processAggregatedNumberEntityValue,
  processAggregatedOrArrayValue,
} from "@/apis/azul/hca-dcp/common/utils";
import { ButtonOutline } from "@/components/common/Button/components/ButtonOutline/buttonOutline";
import {
  MetadataValueTuple,
  PinnedNTagCell,
} from "@/components/common/NTagCell/components/PinnedNTagCell/pinnedNTagCell";
import { BioNetworkCell } from "@/components/common/Table/components/Cell/components/BioNetworkCell/bioNetworkCell";
import { CXGDownloadCell } from "@/components/common/Table/components/Cell/components/CXGDownloadCell/cxgDownloadCell";
import { TrackerDownloadCell } from "@/components/common/Table/components/Cell/components/TrackerDownloadCell/trackerDownloadCell";
import { AnalysisPortalCell } from "@/components/HCABioNetworks/Network/Atlas/components/Overview/components/MainColumn/components/AnalysisPortalCell/analysisPortalCell";
import { NETWORKS_ROUTE } from "@/constants/routes";
import type {
  Atlas,
  AtlasesRow,
  AtlasRow,
  IntegratedAtlasRow,
  Network,
  SourceStudyRow,
} from "@/types/network";
import { formatCountSize } from "@/utils/formatCountSize";
import {
  buildTrackerDownloadCellProps,
  isTrackerDatasetAsset,
} from "@/utils/trackerNetwork";
import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { CookieBanner } from "@databiosphere/findable-ui/lib/components/common/Banner/components/CookieBanner/cookieBanner";
import { KeyValues } from "@databiosphere/findable-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { BasicCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/BasicCell/basicCell";
import {
  MetadataValue,
  NTagCell,
} from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/nTagCell";
import { ColumnDef } from "@tanstack/react-table";
import type { JSX } from "react";
import { DISEASE } from "./entities";

/**
 * Merges two arrays of values and returns a list of distinct values.
 * @param values01 - Distinct list of values.
 * @param values02 - Additional list of values to be concatenated.
 * @returns List of distinct values.
 */
export function accumulateValues(
  values01 = [] as string[],
  values02: string[]
): string[] {
  const concatenatedValues = values01.concat(values02).sort();
  const setOfAccumulatedValues = new Set(concatenatedValues);
  return [...setOfAccumulatedValues];
}

/**
 * Build props for CookieBanner component.
 * @returns model to be used as props for the CookieBanner component.
 */
export const buildCookieBanner = (): React.ComponentProps<
  typeof CookieBanner
> => {
  return {
    localStorageKey: "privacy-accepted",
    message:
      "This website uses cookies for security and analytics purposes. By using this site, you agree to these uses.",
    secondaryAction: (
      <ButtonOutline
        /* eslint-disable sonarjs/link-with-target-blank -- rule doesn't recognize constant */
        onClick={() =>
          window.open(
            "https://data.humancellatlas.org/privacy",
            ANCHOR_TARGET.BLANK,
            REL_ATTRIBUTE.NO_OPENER_NO_REFERRER
          )
        }
        /* eslint-enable sonarjs/link-with-target-blank -- keep checking future noopener cases */
      >
        Learn More
      </ButtonOutline>
    ),
  };
};

/**
 * Returns atlases actions column def.
 * @param isTracker - True when rendering tracker-sourced atlases (uses tracker download cell).
 * @returns actions column def.
 */
function getAtlasesActionsColumnDef(
  isTracker = false
): ColumnDef<IntegratedAtlasRow> {
  return {
    accessorKey: "actions",
    cell: isTracker
      ? ({ row }): JSX.Element | null => {
          // The row type is shared with CXG atlases, so narrow at the render
          // boundary; a tracker-built row always passes.
          const [asset] = row.original.datasetAssets;
          if (!isTrackerDatasetAsset(asset)) return null;
          return (
            <TrackerDownloadCell
              {...buildTrackerDownloadCellProps(asset)}
              label={row.original.name}
            />
          );
        }
      : ({ row }): JSX.Element => (
          <CXGDownloadCell
            datasetAssets={row.original.datasetAssets}
            title={row.original.name}
          />
        ),
    header: "Download",
  };
}

/**
 * Returns atlases assay column def.
 * @returns assay column def.
 */
function getAtlasesAssayColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "assay",
    cell: ({ row }) => <NTagCell label="assays" values={row.original.assay} />,
    header: "Assay",
  };
}

/**
 * Returns atlases atlas name column def.
 * @param networkPath - Network path.
 * @returns atlas name column def.
 */
function getAtlasesAtlasNameColumnDef(
  networkPath: string
): ColumnDef<AtlasesRow> {
  return {
    accessorKey: "atlasName",
    cell: ({ row }) => (
      <Link
        label={row.original.atlasName}
        url={`${NETWORKS_ROUTE}/${networkPath}/atlases/${row.original.path}`}
      />
    ),
    header: "Atlas Name",
  };
}

/**
 * Returns atlases cell count column def.
 * @returns cell count column def.
 */
function getAtlasesCellCountColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "cellCount",
    cell: ({ row }) => formatCountSize(row.original.cellCount),
    header: "Cells",
  };
}

/**
 * Returns atlases disease column def.
 * @returns disease column def.
 */
function getAtlasesDiseaseColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "disease",
    cell: ({ row }) => (
      <PinnedNTagCell
        label="diseases"
        values={partitionMetadataValues(
          [...row.original.disease],
          [DISEASE.NORMAL]
        )}
      />
    ),
    header: "Disease",
  };
}

/**
 * Returns atlases explore column def.
 * @returns explore column def.
 */
function getAtlasesExploreColumnDef<
  T extends IntegratedAtlasRow,
>(): ColumnDef<T> {
  return {
    accessorKey: "explore",
    cell: ({ row }) => (
      <AnalysisPortalCell analysisPortals={row.original.analysisPortals} />
    ),
    header: "Explore",
  };
}

/**
 * Returns the table column definition model for the atlases table.
 * @param networkPath - Network path.
 * @returns atlases table column definition.
 */
export function getAtlasesTableColumns(
  networkPath: string
): ColumnDef<AtlasesRow>[] {
  return [
    getAtlasesAtlasNameColumnDef(networkPath),
    getAtlasesTissueColumnDef(),
    getAtlasesDiseaseColumnDef(),
    getAtlasesAssayColumnDef(),
    getAtlasesCellCountColumnDef(),
  ];
}

/**
 * Returns atlases tissue column def.
 * @returns tissue column def.
 */
function getAtlasesTissueColumnDef<T extends AtlasRow>(): ColumnDef<T> {
  return {
    accessorKey: "tissue",
    cell: ({ row }) => (
      <NTagCell label="tissues" values={row.original.tissue} />
    ),
    header: "Tissue",
  };
}

/**
 * Returns the bio network name, without the suffix "Network".
 * @param name - Bio network name.
 * @returns name of the bio network.
 */
export function getBioNetworkName(name: string): string {
  return name.replace(/(\sNetwork.*)/gi, "");
}

/**
 * Returns bio network atlases column def.
 * @returns atlases column def.
 */
function getBioNetworksAtlasesColumnDef(): ColumnDef<Network> {
  return {
    accessorKey: "atlases",
    cell: ({ row }) => <BasicCell value={row.original.atlases.length} />,
    header: "Atlases",
  };
}

/**
 * Returns bio network name column def.
 * @returns network name column def.
 */
function getBioNetworksNetworkNameColumnDef(): ColumnDef<Network> {
  return {
    accessorKey: "networkName",
    cell: ({ row }) => <BioNetworkCell network={row.original} />,
    header: "HCA Biological Network Atlas",
  };
}

/**
 * Returns the table column definition model for the bio networks table.
 * @returns bio networks table column definition.
 */
export function getBioNetworksTableColumns(): ColumnDef<Network>[] {
  return [
    getBioNetworksNetworkNameColumnDef(),
    getBioNetworksAtlasesColumnDef(),
  ];
}

/**
 * Returns donor disease column def.
 * @returns donor disease column def.
 */
function getDonorDiseaseColumnDef(): ColumnDef<SourceStudyRow> {
  return {
    accessorKey: "diseases",
    cell: ({ row }) => (
      <PinnedNTagCell
        label="diseases"
        values={partitionMetadataValues(row.original.diseases, [
          DISEASE.NORMAL,
        ])}
      />
    ),
    header: "Disease (Donor)",
  };
}

/**
 * Returns estimate cell count column def.
 * @returns estimate cell count column def.
 */
function getEstimateCellCountColumnDef(): ColumnDef<SourceStudyRow> {
  return {
    accessorKey: "cellCount",
    cell: ({ row }) => <BasicCell value={row.original.cellCount} />,
    header: "Cell Count Est.",
  };
}

/**
 * Returns genus species column def.
 * @returns genus species column def.
 */
function getGenusSpeciesColumnDef(): ColumnDef<SourceStudyRow> {
  return {
    accessorKey: "species",
    cell: ({ row }) => (
      <NTagCell label="species" values={row.original.species} />
    ),
    header: "Species",
  };
}

/**
 * Returns integrated atlases atlas name column def.
 * @returns atlas name column def.
 */
function getIntegratedAtlasesAtlasNameColumnDef(): ColumnDef<IntegratedAtlasRow> {
  return {
    accessorKey: "name",
    cell: ({ row }) => <BasicCell value={row.original.name} />,
    header: "Atlas Name",
  };
}

/**
 * Returns the table column definition model for the integrated atlases table.
 * @param showExplore - Whether to include the Explore column (omitted when no atlas has an analysis portal to link to).
 * @param isTracker - True when building columns for tracker-sourced atlases.
 * @returns integrated atlases table column definition.
 */
export function getIntegratedAtlasesTableColumns(
  showExplore = true,
  isTracker = false
): ColumnDef<IntegratedAtlasRow>[] {
  const columns: ColumnDef<IntegratedAtlasRow>[] = [
    getIntegratedAtlasesAtlasNameColumnDef(),
    getAtlasesTissueColumnDef(),
    getAtlasesDiseaseColumnDef(),
    getAtlasesCellCountColumnDef(),
  ];
  if (showExplore) {
    columns.push(getAtlasesExploreColumnDef());
  }
  columns.push(getAtlasesActionsColumnDef(isTracker));
  return columns;
}

/**
 * Returns library construction method column def.
 * @returns library construction method column def.
 */
function getLibraryConstructionMethodColumnDef(): ColumnDef<SourceStudyRow> {
  return {
    accessorKey: "libraryConstructionMethods",
    cell: ({ row }) => (
      <NTagCell
        label="library construction methods"
        values={row.original.libraryConstructionMethods}
      />
    ),
    header: "Method",
  };
}

/**
 * Returns the network summary.
 * @param network - Network.
 * @returns network summary.
 */
function getNetworkSummary(network: Network): Record<string, number> {
  const atlases = rollUpAtlases(network.atlases, false);
  if (atlases.length === 0) {
    return {
      atlases: 0,
      cells: 0,
      diseases: 0,
      tissues: 0,
    };
  }
  return {
    atlases: atlases.length,
    cells: processAggregatedNumberEntityValue(atlases, "cellCount"),
    diseases: processDiseaseSummary(
      processAggregatedOrArrayValue(atlases, "disease")
    ).length,
    tissues: processAggregatedOrArrayValue(atlases, "tissue").length,
  };
}

/**
 * Returns the key value pairs for the network summary key value pairs component.
 * @param network - Network.
 * @returns key value pairs for the key value pairs component.
 */
export function getNetworkSummaryKeyValuePairs(network: Network): KeyValues {
  const summary = getNetworkSummary(network);
  const keyValues: KeyValues = new Map();
  keyValues.set("Atlases", summary.atlases.toLocaleString());
  keyValues.set("Diseases", summary.diseases.toLocaleString());
  keyValues.set("Tissues", summary.tissues.toLocaleString());
  keyValues.set("Cells", formatCountSize(summary.cells));
  return keyValues;
}

/**
 * Returns project title column def.
 * @returns project title column def.
 */
function getProjectTitleColumnDef(): ColumnDef<SourceStudyRow> {
  return {
    accessorKey: "title",
    cell: ({ row }) => (
      <Link
        label={row.original.title}
        target={ANCHOR_TARGET.BLANK}
        url={row.original.url}
      />
    ),
    header: "Project Title",
  };
}

/**
 * Returns the table column definition model for the atlas Source Studies table.
 * @returns source studies table column definition.
 */
export function getSourceStudiesTableColumns(): ColumnDef<SourceStudyRow>[] {
  return [
    getProjectTitleColumnDef(),
    getGenusSpeciesColumnDef(),
    getLibraryConstructionMethodColumnDef(),
    getSpecimenOrganColumnDef(),
    getDonorDiseaseColumnDef(),
    getEstimateCellCountColumnDef(),
  ];
}

/**
 * Returns specimen organ "Anatomical Entity" column def.
 * @returns anatomical entity column def.
 */
function getSpecimenOrganColumnDef(): ColumnDef<SourceStudyRow> {
  return {
    accessorKey: "organs",
    cell: ({ row }) => (
      <NTagCell label="anatomical entities" values={row.original.organs} />
    ),
    header: "Anatomical Entity",
  };
}

/**
 * Initialize atlases row.
 * @returns initialized atlases row.
 */
function initAtlasRow(): AtlasesRow {
  return {
    analysisPortals: [],
    assay: [],
    atlasName: "",
    cellCount: 0,
    datasetAssets: [],
    disease: [],
    organism: [],
    path: "",
    tissue: [],
  };
}

/**
 * Returns metadata values partitioned into pinned values and non-pinned values.
 * @param values - Values to partition.
 * @param pinned - Values to pin.
 * @returns metadata tuple containing pinned values and non-pinned values.
 */
export function partitionMetadataValues(
  values: MetadataValue[],
  pinned: MetadataValue[]
): MetadataValueTuple {
  const partitionedValues: MetadataValueTuple = [[], []];
  return values.reduce((acc, value) => {
    if (pinned.includes(value)) {
      acc[0].push(value);
    } else {
      acc[1].push(value);
    }
    return acc;
  }, partitionedValues);
}

/**
 * Returns the summary of diseases with "normal" filtered.
 * @param diseases - Diseases.
 * @returns a summary of diseases.
 */
function processDiseaseSummary(diseases: string[]): string[] {
  return diseases.filter((disease) => disease !== DISEASE.NORMAL);
}

/**
 * Returns the rolled up atlas sanitized with "Unspecified", if assay, disease, organism or tissue are empty.
 * @param rolledUpAtlas - Rolled up atlas.
 * @returns rolled up atlas sanitized with "Unspecified".
 */
function processRolledUpAtlas(rolledUpAtlas: AtlasesRow): void {
  if (rolledUpAtlas.assay.length === 0) {
    rolledUpAtlas.assay = [LABEL.UNSPECIFIED];
  }
  if (rolledUpAtlas.disease.length === 0) {
    rolledUpAtlas.disease = [LABEL.UNSPECIFIED];
  }
  if (rolledUpAtlas.organism.length === 0) {
    rolledUpAtlas.organism = [LABEL.UNSPECIFIED];
  }
  if (rolledUpAtlas.tissue.length === 0) {
    rolledUpAtlas.tissue = [LABEL.UNSPECIFIED];
  }
}

/**
 * Rolls up integrated atlases for each atlas.
 * @param atlases - Atlases.
 * @param shouldSanitize - Flag to sanitize the rolled up atlases.
 * @returns rolled up atlases.
 */
export function rollUpAtlases(
  atlases: Atlas[],
  shouldSanitize: boolean
): AtlasesRow[] {
  const rolledUpAtlasMap: Map<string, AtlasesRow> = new Map();
  for (const { integratedAtlases, name, path, summaryCellCount } of atlases) {
    rolledUpAtlasMap.set(name, {
      ...initAtlasRow(),
      atlasName: name,
      path,
    });
    if (rolledUpAtlasMap.has(name)) {
      const rolledUpAtlas = rolledUpAtlasMap.get(name) as AtlasesRow;
      for (const {
        assay,
        cellCount,
        disease,
        organism,
        tissue,
      } of integratedAtlases) {
        rolledUpAtlas.assay = accumulateValues(rolledUpAtlas.assay, assay);
        rolledUpAtlas.cellCount += cellCount;
        rolledUpAtlas.disease = accumulateValues(
          rolledUpAtlas.disease,
          disease
        );
        rolledUpAtlas.organism = accumulateValues(
          rolledUpAtlas.organism,
          organism
        );
        rolledUpAtlas.tissue = accumulateValues(rolledUpAtlas.tissue, tissue);
      }
      // If summary cell count is available, use that instead of rolling up cell count.
      if (summaryCellCount) {
        rolledUpAtlas.cellCount = summaryCellCount;
      }
      // Sanitize the rolled up atlas values for display.
      // Omit for summary counts.
      if (shouldSanitize) {
        processRolledUpAtlas(rolledUpAtlas);
      }
    }
  }
  return [...rolledUpAtlasMap].map(([, atlasRow]) => atlasRow);
}
