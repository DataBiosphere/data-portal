import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "./types";
import { COLUMN_DEFS } from "./columnDefs";

export const TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: COLUMN_DEFS,
  initialState: {
    columnVisibility: {
      bioNetwork: false,
      classKey: true,
      required: false,
      tier: false,
    },
    expanded: true,
    grouping: ["classKey"],
  },
};
