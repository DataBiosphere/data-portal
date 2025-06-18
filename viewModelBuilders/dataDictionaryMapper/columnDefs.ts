import { ColumnDef } from "@tanstack/react-table";
import { Attribute } from "./types";
import { FieldCell } from "../../components/DataDictionary/components/TableCell/components/FieldCell/fieldCell";
import { DetailCell } from "../../components/DataDictionary/components/TableCell/components/DetailCell/detailCell";

export const COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
  {
    accessorKey: "classKey",
    header: "Class Key",
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableGrouping: true,
    id: "classKey",
  },
  {
    accessorKey: "field",
    cell: FieldCell,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    header: "Field",
    id: "field",
    meta: { width: { max: "264px", min: "264px" } },
  },
  {
    accessorKey: "details",
    cell: DetailCell,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    header: "Details",
    id: "details",
    meta: { width: "1fr" },
  },
  {
    accessorFn: (row) => (row.required ? "Required" : "Not Required"),
    enableColumnFilter: true,
    enableGlobalFilter: false,
    enableHiding: false,
    filterFn: "arrIncludesSome",
    header: "Required",
    id: "required",
  },
  {
    accessorFn: (row) => row.annotations?.bioNetworks,
    enableColumnFilter: true,
    enableGlobalFilter: false,
    enableHiding: false,
    filterFn: "arrIncludesSome",
    header: "BioNetwork",
    id: "bioNetwork",
  },
  {
    accessorFn: (row) => row.annotations?.tier,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableHiding: false,
    filterFn: "arrIncludesSome",
    header: "Tier",
    id: "tier",
  },
  /* GLOBAL FILTERS */
  {
    accessorFn: (row) => row.annotations?.annDataLocation,
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "AnnData Location",
    id: "annDataLocation",
  },
  {
    accessorKey: "name",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "Name",
    id: "name",
  },
  {
    accessorKey: "description",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "Description",
    id: "description",
  },
  {
    accessorKey: "title",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "Title",
    id: "title",
  },
  {
    accessorKey: "rationale",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    header: "Rationale",
    id: "rationale",
  },
  {
    accessorKey: "values",
    header: "Allowed Values",
    enableColumnFilter: false,
    enableGlobalFilter: true,
    id: "values",
  },
];
