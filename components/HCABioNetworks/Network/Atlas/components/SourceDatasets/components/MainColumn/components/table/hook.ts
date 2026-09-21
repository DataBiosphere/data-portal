import { COLUMN_FILTERS_OPTIONS } from "@/components/common/Table/options/columnFilters/constants";
import { CORE_OPTIONS } from "@/components/common/Table/options/core/constants";
import { FACETED_OPTIONS } from "@/components/common/Table/options/faceted/constants";
import { SORTING_OPTIONS } from "@/components/common/Table/options/sorting/constants";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import type { TrackerSourceDataset } from "@/types/network";
import { SORT_DIRECTION } from "@databiosphere/findable-ui/lib/config/entities";
import { FacetedOptions, Table, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { getColumns } from "./columns";
import { META } from "./meta";
import { getColumnVisibility } from "./utils";

/**
 * Returns a configured TanStack table instance for tracker source datasets.
 * @param data - Tracker source datasets.
 * @returns table instance.
 */
export const useTable = (
  data: TrackerSourceDataset[]
): Table<TrackerSourceDataset> => {
  const { browserURL } = useSiteConfig();
  // Both are memoised so the column instances stay reference-stable: TanStack
  // keys its `getAllColumns` memo on `options.columns` by identity, so a fresh
  // array each render would discard every column's faceting cache.
  const columns = useMemo(() => getColumns(browserURL), [browserURL]);
  const columnVisibility = useMemo(
    () => getColumnVisibility(data, browserURL),
    [data, browserURL]
  );

  return useReactTable<TrackerSourceDataset>({
    columns,
    data,
    ...COLUMN_FILTERS_OPTIONS,
    ...CORE_OPTIONS,
    ...(FACETED_OPTIONS as FacetedOptions<TrackerSourceDataset>),
    ...SORTING_OPTIONS,
    enableRowPosition: false,
    enableRowPreview: false,
    getRowId: (row) => row.id,
    initialState: {
      sorting: [{ desc: SORT_DIRECTION.ASCENDING, id: "fileName" }],
    },
    meta: META,
    state: {
      columnVisibility,
    },
  });
};
