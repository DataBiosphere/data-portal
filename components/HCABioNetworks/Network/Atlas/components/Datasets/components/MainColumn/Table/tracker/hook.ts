import { SORT_DIRECTION } from "@databiosphere/findable-ui/lib/config/entities";
import { Table, useReactTable } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import { CORE_OPTIONS } from "../../../../../../../../../common/Table/options/core/constants";
import { SORTING_OPTIONS } from "../../../../../../../../../common/Table/options/sorting/constants";
import { COLUMNS } from "./columns";

/**
 * Returns a configured TanStack table instance for tracker source datasets.
 * @param data - Tracker source datasets.
 * @returns table instance.
 */
export const useTable = (
  data: TrackerSourceDataset[]
): Table<TrackerSourceDataset> => {
  return useReactTable<TrackerSourceDataset>({
    columns: COLUMNS,
    data,
    ...CORE_OPTIONS,
    ...SORTING_OPTIONS,
    enableRowPosition: false,
    enableRowPreview: false,
    getRowId: (row) => row.id,
    initialState: {
      sorting: [{ desc: SORT_DIRECTION.ASCENDING, id: "title" }],
    },
    state: {
      columnVisibility: {},
    },
  });
};
