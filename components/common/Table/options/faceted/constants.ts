import { getFacetedUniqueValuesWithArrayValues } from "@databiosphere/findable-ui/lib/components/Table/common/utils";
import {
  FacetedOptions,
  getFacetedRowModel,
  RowData,
} from "@tanstack/react-table";

// FacetedOptions.getFacetedRowModel is typed with the table generic (unlike
// SortingOptions/ColumnFiltersOptions which use `any`), so the shared constant
// must be typed as `FacetedOptions<any>` to spread into any useReactTable call.
export const FACETED_OPTIONS: Pick<
  FacetedOptions<RowData>,
  "getFacetedRowModel" | "getFacetedUniqueValues"
> = {
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValuesWithArrayValues(),
};
