import { ColumnDef } from "@tanstack/react-table";
import { Attribute } from "./types";
import { FieldCell } from "../../components/DataDictionary/components/TableCell/components/FieldCell/fieldCell";
import { DetailCell } from "../../components/DataDictionary/components/TableCell/components/DetailCell/detailCell";

export const COLUMN_DEFS: ColumnDef<Attribute, undefined>[] = [
  {
    accessorKey: "field",
    cell: FieldCell,
    header: "Field",
    id: "field",
    meta: { width: { max: "264px", min: "264px" } },
  },
  {
    accessorKey: "details",
    cell: DetailCell,
    header: "Details",
    id: "details",
    meta: { width: { max: "1fr", min: "862px" } },
  },
];
