import { SORT_DIRECTION } from "@databiosphere/findable-ui/lib/config/entities";
import { Table, useReactTable } from "@tanstack/react-table";
import type { TrackerSourceDataset } from "../../../../../../../../../../@types/network";
import { useAtlas } from "../../../../../../../../../../contexts/atlasContext";
import { CORE_OPTIONS } from "../../../../../../../../../common/Table/options/core/constants";
import { SORTING_OPTIONS } from "../../../../../../../../../common/Table/options/sorting/constants";
import { COLUMNS } from "./columns";

/**
 * Returns a configured TanStack table instance for tracker source datasets.
 * Passes tracker config via table meta for download URL construction.
 * @param data - Tracker source datasets.
 * @returns table instance.
 */
export const useTable = (
  data: TrackerSourceDataset[]
): Table<TrackerSourceDataset> => {
  const { atlas, network } = useAtlas();
  const { tracker } = atlas;
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
    meta: {
      networkKey: network.key,
      shortNameSlug: tracker?.shortNameSlug,
      version: tracker?.version,
    },
    state: {
      columnVisibility: {},
    },
  });
};
