import { COLUMN_IDENTIFIER } from "@databiosphere/findable-ui/lib/components/Table/common/columnIdentifier";
import type { TableOptions } from "@tanstack/react-table";
import type { ProjectsResponse } from "../../../../../../../../../../apis/azul/hca-dcp/common/responses";

export const TABLE_OPTIONS: Partial<TableOptions<ProjectsResponse>> = {
  enableRowPosition: false,
  initialState: {
    columnVisibility: { [COLUMN_IDENTIFIER.ROW_POSITION]: false },
  },
};
