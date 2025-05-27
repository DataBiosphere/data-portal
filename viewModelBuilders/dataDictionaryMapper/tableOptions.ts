import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "./types";

export const TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "columns" | "data" | "getCoreRowModel"
> = {
  initialState: {
    columnVisibility: { classKey: true, required: false, bioNetwork: false },
    expanded: true,
    grouping: ["classKey"],
  },
};
