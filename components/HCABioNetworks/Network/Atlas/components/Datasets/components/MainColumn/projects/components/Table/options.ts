import type { SourceStudyRow } from "@/types/network";
import { COLUMN_IDENTIFIER } from "@databiosphere/findable-ui/lib/components/Table/common/columnIdentifier";
import type { TableOptions } from "@tanstack/react-table";

export const TABLE_OPTIONS: Partial<TableOptions<SourceStudyRow>> = {
  enableRowPosition: false,
  initialState: {
    columnVisibility: { [COLUMN_IDENTIFIER.ROW_POSITION]: false },
  },
};
