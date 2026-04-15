import { SORT_DIRECTION } from "@databiosphere/findable-ui/lib/config/entities";
import { useConfig } from "@databiosphere/findable-ui/lib/hooks/useConfig";
import { Table, useReactTable } from "@tanstack/react-table";
import type { TrackerSourceStudy } from "../../../../../../../../../../@types/network";
import { CORE_OPTIONS } from "../../../../../../../../../common/Table/options/core/constants";
import { SORTING_OPTIONS } from "../../../../../../../../../common/Table/options/sorting/constants";
import { COLUMNS } from "./columns";

/**
 * Returns a configured TanStack table instance for tracker source studies.
 * @param data - Tracker source studies.
 * @returns table instance.
 */
export const useTable = (
  data: TrackerSourceStudy[]
): Table<TrackerSourceStudy> => {
  const { config } = useConfig();

  return useReactTable<TrackerSourceStudy>({
    columns: COLUMNS,
    data,
    ...CORE_OPTIONS,
    ...SORTING_OPTIONS,
    enableRowPosition: false,
    enableRowPreview: false,
    getRowId: (row) => row.id,
    initialState: {
      sorting: [{ desc: SORT_DIRECTION.ASCENDING, id: "sourceStudy" }],
    },
    meta: { browserUrl: config.browserURL },
    state: {
      columnVisibility: {},
    },
  });
};
