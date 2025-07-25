import { ColumnDef } from "@tanstack/react-table";
import { Attribute } from "./types";
import { FieldCell } from "../../components/DataDictionary/components/TableCell/components/FieldCell/fieldCell";
import { DetailCell } from "../../components/DataDictionary/components/TableCell/components/DetailCell/detailCell";
import { GridTrackSize } from "@databiosphere/findable-ui/lib/config/entities";
import { COLUMN_IDENTIFIERS } from "./columnIds";

const ANN_DATA_LOCATION: ColumnDef<Attribute, unknown> = {
  accessorKey: "annotations.annDataLocation",
  enableColumnFilter: true,
  enableGlobalFilter: false,
  header: "AnnData",
  filterFn: "arrIncludesSome",
  id: COLUMN_IDENTIFIERS.ANN_DATA_LOCATION,
};

const BIO_NETWORK: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => row.annotations?.bioNetworks,
  enableColumnFilter: true,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "BioNetwork",
  id: COLUMN_IDENTIFIERS.BIO_NETWORK,
};

const CLASS_KEY: ColumnDef<Attribute, unknown> = {
  accessorKey: "classKey",
  header: "Class Key",
  enableColumnFilter: false,
  enableGlobalFilter: false,
  enableGrouping: true,
  id: COLUMN_IDENTIFIERS.CLASS_KEY,
};

const DESCRIPTION: ColumnDef<Attribute, unknown> = {
  accessorKey: "description",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Description",
  id: COLUMN_IDENTIFIERS.DESCRIPTION,
};

const DETAILS: ColumnDef<Attribute, unknown> = {
  accessorKey: "details",
  cell: DetailCell,
  enableColumnFilter: false,
  enableGlobalFilter: false,
  header: "Description",
  id: COLUMN_IDENTIFIERS.DETAILS,
  meta: { width: { min: "396px", max: "1fr" } },
};

const FIELD: ColumnDef<Attribute, unknown> = {
  accessorKey: "field",
  cell: FieldCell,
  enableColumnFilter: false,
  enableGlobalFilter: false,
  header: "Field",
  id: COLUMN_IDENTIFIERS.FIELD,
  meta: {
    width:
      "round(up, clamp(min(31.26%, 352px), 31.26%, 496px), 1px)" as GridTrackSize,
  },
};

const LOCATION_NAME: ColumnDef<Attribute, unknown> = {
  accessorKey: "locationName",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Location Name",
  id: COLUMN_IDENTIFIERS.LOCATION_NAME,
};

const NAME: ColumnDef<Attribute, unknown> = {
  accessorKey: "name",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Name",
  id: COLUMN_IDENTIFIERS.NAME,
};

const RATIONALE: ColumnDef<Attribute, unknown> = {
  accessorKey: "rationale",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Rationale",
  id: COLUMN_IDENTIFIERS.RATIONALE,
};

const REQUIRED: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => (row.required ? "Required" : "Recommended"),
  enableColumnFilter: true,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "Required",
  id: COLUMN_IDENTIFIERS.REQUIRED,
};

const SOURCE: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => row.source?.children || "None",
  enableColumnFilter: true,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "Source",
  id: COLUMN_IDENTIFIERS.SOURCE,
};

const TIER: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => row.annotations?.tier,
  enableColumnFilter: false,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "Tier",
  id: COLUMN_IDENTIFIERS.TIER,
};

const TITLE: ColumnDef<Attribute, unknown> = {
  accessorKey: "title",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Title",
  id: COLUMN_IDENTIFIERS.TITLE,
};

const VALUES: ColumnDef<Attribute, unknown> = {
  accessorKey: "values",
  header: "Allowed Values",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  id: COLUMN_IDENTIFIERS.VALUES,
};

export const CELL_ANNOTATION_COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
  CLASS_KEY,
  FIELD,
  DETAILS,
  REQUIRED,
  BIO_NETWORK,
  TIER,
  ANN_DATA_LOCATION,
  SOURCE,
  /* GLOBAL FILTERS */
  LOCATION_NAME,
  DESCRIPTION,
  TITLE,
  RATIONALE,
  VALUES,
];

export const TIER_1_COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
  CLASS_KEY,
  FIELD,
  DETAILS,
  REQUIRED,
  BIO_NETWORK,
  TIER,
  ANN_DATA_LOCATION,
  SOURCE,
  /* GLOBAL FILTERS */
  LOCATION_NAME,
  DESCRIPTION,
  TITLE,
  RATIONALE,
  VALUES,
];

export const TIER_2_COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
  CLASS_KEY,
  FIELD,
  DETAILS,
  REQUIRED,
  BIO_NETWORK,
  TIER,
  SOURCE,
  /* GLOBAL FILTERS */
  NAME,
  DESCRIPTION,
  TITLE,
  RATIONALE,
  VALUES,
];
