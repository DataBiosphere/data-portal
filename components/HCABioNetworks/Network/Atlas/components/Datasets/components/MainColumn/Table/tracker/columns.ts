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
import { renderCellCount, renderDownload } from "./viewBuilder";

const CELL_COUNT = {
  accessorKey: "cellCount",
  cell: renderCellCount,
  header: "Cell Count",
  meta: { width: { max: "1fr", min: "100px" } },
  sortingFn: "alphanumeric",
} as ColumnDef<TrackerSourceDataset>;

const DISEASE = {
  accessorKey: "disease",
  cell: renderPinnedNTagCell(
    buildPinnedNTagProps("diseases", "disease", [DISEASE_ENUM.NORMAL])
  ),
  header: "Disease",
  meta: { width: { max: "1fr", min: "100px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

const DOWNLOAD = {
  accessorKey: "download",
  cell: renderDownload,
  enableSorting: false,
  header: "Download",
  meta: { width: "auto" },
} as ColumnDef<TrackerSourceDataset>;

const TISSUE = {
  accessorKey: "tissue",
  cell: renderNTagCell(buildNTagProps("tissues", "tissue")),
  header: "Tissue",
  meta: { width: { max: "1fr", min: "100px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

const TITLE = {
  accessorKey: "title",
  header: "Dataset",
  meta: { columnPinned: true, width: { max: "2fr", min: "200px" } },
  sortingFn,
} as ColumnDef<TrackerSourceDataset>;

export const COLUMNS: ColumnDef<TrackerSourceDataset>[] = [
  TITLE,
  TISSUE,
  DISEASE,
  CELL_COUNT,
  DOWNLOAD,
];
