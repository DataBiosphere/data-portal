import { sortingFn } from "@databiosphere/findable-ui/lib/components/Table/common/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TrackerSourceStudy } from "../../../../../../../../../../@types/network";
import { buildSourceStudy } from "./accessor";
import { renderHCADataRepository, renderSourceStudy } from "./viewBuilder";

const HCA_DATA_REPOSITORY = {
  accessorKey: "hcaProjectId",
  cell: renderHCADataRepository,
  enableSorting: false,
  header: "HCA Data Repository",
  meta: { width: "auto" },
} as ColumnDef<TrackerSourceStudy>;

const SOURCE_DATASET_COUNT = {
  accessorKey: "sourceDatasetCount",
  header: "Datasets",
  meta: { width: { max: "0.5fr", min: "140px" } },
  sortingFn: "alphanumeric",
} as ColumnDef<TrackerSourceStudy>;

const SOURCE_STUDY = {
  accessorFn: buildSourceStudy,
  cell: renderSourceStudy,
  header: "Source Study",
  id: "sourceStudy",
  meta: { width: { max: "1.2fr", min: "200px" } },
  sortingFn,
} as ColumnDef<TrackerSourceStudy>;

const TITLE = {
  accessorKey: "title",
  header: "Title",
  meta: { columnPinned: true, width: { max: "2fr", min: "200px" } },
  sortingFn,
} as ColumnDef<TrackerSourceStudy>;

export const COLUMNS: ColumnDef<TrackerSourceStudy>[] = [
  SOURCE_STUDY,
  TITLE,
  SOURCE_DATASET_COUNT,
  HCA_DATA_REPOSITORY,
];
