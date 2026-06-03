import { sortingFn } from "@databiosphere/findable-ui/lib/components/Table/common/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { TrackerSourceStudy } from "../../../../../../../../../../../@types/network";
import { buildSourceStudy } from "./accessor";
import { renderHCADataRepository, renderSourceStudy } from "./viewBuilder";

const HCA_DATA_REPOSITORY = {
  accessorKey: "hcaProjectId",
  cell: renderHCADataRepository,
  enableColumnFilter: false,
  enableSorting: false,
  header: "HCA Data Explorer",
  id: "hcaProjectId",
  meta: { width: "auto" },
} as ColumnDef<TrackerSourceStudy>;

const JOURNAL = {
  accessorFn: (row: TrackerSourceStudy) => row.journal ?? "Unpublished",
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Journal",
  id: "journal",
} as ColumnDef<TrackerSourceStudy>;

const REFERENCE_AUTHOR = {
  accessorKey: "referenceAuthor",
  enableColumnFilter: true,
  filterFn: "arrIncludesSome",
  header: "Reference Author",
  id: "referenceAuthor",
} as ColumnDef<TrackerSourceStudy>;

const SOURCE_STUDY = {
  accessorFn: buildSourceStudy,
  cell: renderSourceStudy,
  enableColumnFilter: false,
  header: "Source Study",
  id: "sourceStudy",
  meta: { width: { max: "1.2fr", min: "200px" } },
  sortingFn,
} as ColumnDef<TrackerSourceStudy>;

const TITLE = {
  accessorKey: "title",
  enableColumnFilter: false,
  header: "Title",
  id: "title",
  meta: { columnPinned: true, width: { max: "2fr", min: "200px" } },
  sortingFn,
} as ColumnDef<TrackerSourceStudy>;

export const COLUMNS: ColumnDef<TrackerSourceStudy>[] = [
  SOURCE_STUDY,
  TITLE,
  HCA_DATA_REPOSITORY,
  JOURNAL,
  REFERENCE_AUTHOR,
];
