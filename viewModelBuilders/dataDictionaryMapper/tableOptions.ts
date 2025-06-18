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
      annDataLocation: false,
      bioNetwork: false,
      classKey: true,
      description: false,
      name: false,
      rationale: false,
      required: false,
      tier: false,
      title: false,
      values: false,
    },
    expanded: true,
    grouping: ["classKey"],
  },
};
