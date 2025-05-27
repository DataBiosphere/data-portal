import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "./types";

export const TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "columns" | "data" | "getCoreRowModel"
> = {
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
