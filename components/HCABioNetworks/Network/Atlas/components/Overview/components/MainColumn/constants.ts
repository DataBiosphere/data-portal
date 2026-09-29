import { IntegratedAtlasRow } from "@/types/network";
import { COLUMN_IDENTIFIER } from "@databiosphere/findable-ui/lib/components/Table/common/columnIdentifier";
import { TableOptions } from "@tanstack/react-table";

export const TABLE_OPTIONS: Partial<TableOptions<IntegratedAtlasRow>> = {
  enableRowPosition: false,
  initialState: {
    columnVisibility: { [COLUMN_IDENTIFIER.ROW_POSITION]: false },
  },
};
