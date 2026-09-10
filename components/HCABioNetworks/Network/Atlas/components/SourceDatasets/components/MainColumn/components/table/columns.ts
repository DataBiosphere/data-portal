import { sortingFn } from "@databiosphere/findable-ui/lib/components/Table/common/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import { DISEASE as DISEASE_ENUM } from "../../../../../../../../../../viewModelBuilders/entities";
import {
  buildNTagProps,
  renderNTagCell,
} from "../../../../../../../../../common/Table/components/Cell/components/NTagCell/utils";
import {
  buildPinnedNTagProps,
  renderPinnedNTagCell,
} from "../../../../../../../../../common/Table/components/Cell/components/PinnedNTagCell/utils";
import {
  buildIntegratedObjects,
  buildJournal,
  buildReferenceAuthor,
  buildVersionedFileNameValue,
} from "./accessor";
import {
  buildRenderPrimaryData,
  renderCellCount,
  renderDownload,
  renderExplore,
  renderFileName,
} from "./viewBuilder";

const ASSAY = {
  accessorKey: "assay",
  cell: renderNTagCell(buildNTagProps("assays", "assay")),
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Assay",
  id: "assay",
  meta: { width: { max: "1fr", min: "100px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

const CELL_COUNT = {
  accessorKey: "cellCount",
  cell: renderCellCount,
  enableColumnFilter: false,
  header: "Cell Count",
  id: "cellCount",
  meta: { width: { max: "1fr", min: "100px" } },
  sortingFn: "basic",
} as ColumnDef<TrackerSourceDataset>;

const DISEASE = {
  accessorKey: "disease",
  cell: renderPinnedNTagCell(
    buildPinnedNTagProps("diseases", "disease", [DISEASE_ENUM.NORMAL])
  ),
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Disease",
  id: "disease",
  meta: { width: { max: "1fr", min: "100px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

const DOWNLOAD = {
  accessorKey: "download",
  cell: renderDownload,
  enableColumnFilter: false,
  enableSorting: false,
  header: "Download",
  id: "download",
  meta: { width: "auto" },
} as ColumnDef<TrackerSourceDataset>;

const EXPLORE = {
  accessorKey: "explore",
  cell: renderExplore,
  enableColumnFilter: false,
  enableSorting: false,
  header: "Explore",
  id: "explore",
  meta: { width: "auto" },
} as ColumnDef<TrackerSourceDataset>;

const FILE_NAME = {
  accessorFn: buildVersionedFileNameValue,
  cell: renderFileName,
  enableColumnFilter: false,
  header: "File Name / Study",
  id: "fileName",
  meta: { columnPinned: true, width: { max: "2.4fr", min: "260px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

const INTEGRATED_OBJECTS = {
  accessorFn: buildIntegratedObjects,
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Integrated Object",
  id: "integratedObject",
} as ColumnDef<TrackerSourceDataset>;

const JOURNAL = {
  accessorFn: buildJournal,
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Journal",
  id: "journal",
} as ColumnDef<TrackerSourceDataset>;

const REFERENCE_AUTHOR = {
  accessorFn: buildReferenceAuthor,
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Reference Author",
  id: "referenceAuthor",
} as ColumnDef<TrackerSourceDataset>;

const SOURCE_STUDY = {
  accessorKey: "publicationString",
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Source Study",
  id: "sourceStudy",
} as ColumnDef<TrackerSourceDataset>;

const TISSUE = {
  accessorKey: "tissue",
  cell: renderNTagCell(buildNTagProps("tissues", "tissue")),
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Tissue",
  id: "tissue",
  meta: { width: { max: "1fr", min: "100px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

/**
 * Returns the source datasets table columns. Takes the browser URL so the
 * primary data cell can close over it, following the same column-def factory
 * pattern as `getProjectsTableColumns`.
 * @param browserUrl - Environment's HCA Data Explorer browser URL.
 * @returns source datasets table columns.
 */
export function getColumns(
  browserUrl: string
): ColumnDef<TrackerSourceDataset>[] {
  return [
    FILE_NAME,
    ASSAY,
    TISSUE,
    DISEASE,
    CELL_COUNT,
    {
      accessorKey: "hcaProjectId",
      cell: buildRenderPrimaryData(browserUrl),
      enableColumnFilter: false,
      enableSorting: false,
      header: "Primary Data (fastqs)",
      id: "primaryData",
      // The header is much longer than "HCA Explorer", so it would otherwise
      // drive the column width; a min/max lets it wrap instead.
      meta: { width: { max: "1fr", min: "120px" } },
    } as ColumnDef<TrackerSourceDataset>,
    EXPLORE,
    DOWNLOAD,
    INTEGRATED_OBJECTS,
    JOURNAL,
    REFERENCE_AUTHOR,
    SOURCE_STUDY,
  ];
}
