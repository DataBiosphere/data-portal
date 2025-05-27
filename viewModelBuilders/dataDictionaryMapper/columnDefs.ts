import { ColumnDef } from "@tanstack/react-table";
import { Attribute } from "./types";
import { FieldCell } from "../../components/DataDictionary/components/TableCell/components/FieldCell/fieldCell";
import { DetailCell } from "../../components/DataDictionary/components/TableCell/components/DetailCell/detailCell";

export const COLUMN_DEFS: ColumnDef<Attribute, unknown>[] = [
  {
    accessorKey: "classKey",
    header: "Class Key",
    enableColumnFilter: false,
    enableGrouping: true,
    id: "classKey",
  },
  {
    accessorKey: "field",
    cell: FieldCell,
    enableColumnFilter: false,
    header: "Field",
    id: "field",
    meta: { width: { max: "264px", min: "264px" } },
  },
  {
    accessorKey: "details",
    cell: DetailCell,
    enableColumnFilter: false,
    header: "Details",
    id: "details",
    meta: { width: { max: "1fr", min: "862px" } },
  },
  {
    accessorFn: (row) => (row.required ? "Required" : "Not Required"),
    enableColumnFilter: true,
    enableHiding: false,
    filterFn: "arrIncludesSome",
    header: "Required",
    id: "required",
  },
];
