import { ColumnDef } from "@tanstack/react-table";
import { Attribute } from "./types";
import { FieldCell } from "../../components/DataDictionary/components/TableCell/components/FieldCell/fieldCell";
import { DetailCell } from "../../components/DataDictionary/components/TableCell/components/DetailCell/detailCell";

const ANN_DATA_LOCATION: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => row.annotations?.annDataLocation,
  enableColumnFilter: true,
  enableGlobalFilter: false,
  header: "AnnData",
  id: "annDataLocation",
};

const BIO_NETWORK: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => row.annotations?.bioNetworks,
  enableColumnFilter: true,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "BioNetwork",
  id: "bioNetwork",
};

const CLASS_KEY: ColumnDef<Attribute, unknown> = {
  accessorKey: "classKey",
  header: "Class Key",
  enableColumnFilter: false,
  enableGlobalFilter: false,
  enableGrouping: true,
  id: "classKey",
};

const DESCRIPTION: ColumnDef<Attribute, unknown> = {
  accessorKey: "description",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Description",
  id: "description",
};

const DETAILS: ColumnDef<Attribute, unknown> = {
  accessorKey: "details",
  cell: DetailCell,
  enableColumnFilter: false,
  enableGlobalFilter: false,
  header: "Details",
  id: "details",
  meta: { width: "1fr" },
};

const FIELD: ColumnDef<Attribute, unknown> = {
  accessorKey: "field",
  cell: FieldCell,
  enableColumnFilter: false,
  enableGlobalFilter: false,
  header: "Field",
  id: "field",
  meta: { width: { max: "264px", min: "264px" } },
};

const NAME: ColumnDef<Attribute, unknown> = {
  accessorKey: "name",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Name",
  id: "name",
};

const RATIONALE: ColumnDef<Attribute, unknown> = {
  accessorKey: "rationale",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Rationale",
  id: "rationale",
};

const REQUIRED: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => (row.required ? "Required" : "Not Required"),
  enableColumnFilter: true,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "Required",
  id: "required",
};

const SOURCE: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => row.source?.label || "None",
  enableColumnFilter: true,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "Source",
  id: "source",
};

const TIER: ColumnDef<Attribute, unknown> = {
  accessorFn: (row) => row.annotations?.tier,
  enableColumnFilter: false,
  enableGlobalFilter: false,
  enableHiding: false,
  filterFn: "arrIncludesSome",
  header: "Tier",
  id: "tier",
};

const TITLE: ColumnDef<Attribute, unknown> = {
  accessorKey: "title",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  header: "Title",
  id: "title",
};

const VALUES: ColumnDef<Attribute, unknown> = {
  accessorKey: "values",
  header: "Allowed Values",
  enableColumnFilter: false,
  enableGlobalFilter: true,
  id: "values",
};

export const COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
  CLASS_KEY,
  FIELD,
  DETAILS,
  REQUIRED,
  BIO_NETWORK,
  TIER,
  ANN_DATA_LOCATION,
  SOURCE,
  /* GLOBAL FILTERS */
  NAME,
  DESCRIPTION,
  TITLE,
  RATIONALE,
  VALUES,
];

export const TIER_1_SCHEMA_COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
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
