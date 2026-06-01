import { arrIncludesSome } from "@databiosphere/findable-ui/lib/components/Table/columnDef/columnFilters/filterFn";
import {
  ColumnFiltersOptions,
  getFilteredRowModel,
  RowData,
} from "@tanstack/react-table";

export const COLUMN_FILTERS_OPTIONS: Pick<
  ColumnFiltersOptions<RowData>,
  "enableColumnFilters" | "enableFilters" | "filterFns" | "getFilteredRowModel"
> = {
  enableColumnFilters: true,
  enableFilters: true,
  filterFns: { arrIncludesSome },
  getFilteredRowModel: getFilteredRowModel(),
};
