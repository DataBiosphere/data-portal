import { sortingFn } from "@databiosphere/findable-ui/lib/components/Table/common/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../../@types/network";
import { DISEASE as DISEASE_ENUM } from "../../../../../../../../../../../viewModelBuilders/entities";
import {
  buildNTagProps,
  renderNTagCell,
} from "../../../../../../../../../../common/Table/components/Cell/components/NTagCell/utils";
import {
  buildPinnedNTagProps,
  renderPinnedNTagCell,
} from "../../../../../../../../../../common/Table/components/Cell/components/PinnedNTagCell/utils";
import { buildIntegratedObjects } from "./accessor";
import {
  renderCellCount,
  renderDownload,
  renderSourceStudy,
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

const INTEGRATED_OBJECTS = {
  accessorFn: buildIntegratedObjects,
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Integrated Object",
  id: "integratedObject",
} as ColumnDef<TrackerSourceDataset>;

const SOURCE_STUDY = {
  accessorKey: "publicationString",
  cell: renderSourceStudy,
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Source Study",
  id: "sourceStudy",
  meta: { width: { max: "1.2fr", min: "200px" } },
  sortingFn,
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

const TITLE = {
  accessorKey: "title",
  enableColumnFilter: false,
  header: "Dataset",
  id: "title",
  meta: { columnPinned: true, width: { max: "2fr", min: "200px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

export const COLUMNS: ColumnDef<TrackerSourceDataset>[] = [
  TITLE,
  SOURCE_STUDY,
  ASSAY,
  TISSUE,
  DISEASE,
  CELL_COUNT,
  DOWNLOAD,
  INTEGRATED_OBJECTS,
];
