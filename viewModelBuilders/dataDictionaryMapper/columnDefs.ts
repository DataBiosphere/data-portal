import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ChipCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/ChipCell/chipCell";
import { LinkCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/LinkCell/linkCell";
import { Attribute } from "./types";
import { ChipProps } from "@mui/material";

export const COLUMN_DEFS: ColumnDef<Attribute, Attribute[keyof Attribute]>[] = [
  {
    accessorKey: "title",
    header: "Title",
    id: "title",
    meta: { width: { max: "1fr", min: "200px" } },
  },
  {
    accessorKey: "description",
    header: "Description",
    id: "description",
    meta: { width: { max: "2fr", min: "480px" } },
  },
  {
    accessorKey: "name",
    header: "Name",
    id: "name",
    meta: { width: { max: "1fr", min: "180px" } },
  },
  {
    accessorKey: "required",
    cell: (props: CellContext<Attribute, ChipProps>) => ChipCell({ ...props }),
    header: "Required",
    id: "required",
    meta: { width: "auto" },
  },
  {
    accessorKey: "range",
    header: "Range",
    id: "range",
    meta: { width: { max: "1fr", min: "180px" } },
  },
  {
    accessorKey: "multivalued",
    header: "Multivalued",
    id: "multivalued",
    meta: { width: { max: "1fr", min: "180px" } },
  },
  {
    accessorKey: "values",
    header: "Values",
    id: "values",
    meta: { width: { max: "2fr", min: "480px" } },
  },
  {
    accessorKey: "example",
    header: "Example",
    id: "example",
    meta: { width: { max: "1fr", min: "180px" } },
  },
  {
    accessorKey: "rationale",
    header: "Rationale",
    id: "rationale",
    meta: { width: { max: "2fr", min: "480px" } },
  },
  {
    accessorKey: "source",
    cell: LinkCell,
    header: "Source",
    id: "source",
    meta: { width: { max: "1fr", min: "180px" } },
  },
];
