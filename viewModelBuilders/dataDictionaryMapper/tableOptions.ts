import { TableOptions } from "@tanstack/react-table";
import { Attribute } from "./types";
import {
  TIER_2_COLUMN_DEFS,
  TIER_1_COLUMN_DEFS,
  CELL_ANNOTATION_COLUMN_DEFS,
} from "./columnDefs";
import slugify from "slugify";

export const CELL_ANNOTATION_TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: CELL_ANNOTATION_COLUMN_DEFS,
  getRowId: (row) => slugify(row.name),
  initialState: {
    columnVisibility: {
      annDataLocation: false,
      bioNetwork: false,
      classKey: true,
      description: false,
      locationName: false,
      name: false,
      rationale: false,
      required: false,
      source: false,
      title: false,
      values: false,
    },
    grouping: ["classKey"],
  },
};

export const TIER_1_TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: TIER_1_COLUMN_DEFS,
  getRowId: (row) => slugify(row.name),
  initialState: {
    columnVisibility: {
      annDataLocation: false,
      bioNetwork: false,
      classKey: true,
      description: false,
      locationName: false,
      name: false,
      rationale: false,
      required: false,
      source: false,
      title: false,
      values: false,
    },
    grouping: ["classKey"],
  },
};

export const TIER_2_TABLE_OPTIONS: Omit<
  TableOptions<Attribute>,
  "data" | "getCoreRowModel"
> = {
  columns: TIER_2_COLUMN_DEFS,
  getRowId: (row) => slugify(row.name),
  initialState: {
    columnVisibility: {
      bioNetwork: false,
      classKey: true,
      description: false,
      name: false,
      rationale: false,
      required: false,
      source: false,
      title: false,
      values: false,
    },
    grouping: ["classKey"],
  },
};
