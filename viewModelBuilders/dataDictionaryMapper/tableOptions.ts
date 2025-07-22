import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "./types";
import { COLUMN_DEFS, TIER_1_SCHEMA_COLUMN_DEFS } from "./columnDefs";

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
      source: false,
      tier: false,
      title: false,
      values: false,
    },
    grouping: ["classKey"],
  },
};

export const TIER_2_SCHEMA_TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: TIER_1_SCHEMA_COLUMN_DEFS,
  initialState: {
    columnVisibility: {
      bioNetwork: false,
      classKey: true,
      description: false,
      name: false,
      rationale: false,
      required: false,
      source: false,
      tier: false,
      title: false,
      values: false,
    },
    grouping: ["classKey"],
  },
};
