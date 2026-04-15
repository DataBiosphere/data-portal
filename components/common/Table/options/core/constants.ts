import { ROW_POSITION } from "@databiosphere/findable-ui/lib/components/Table/features/RowPosition/constants";
import { ROW_PREVIEW } from "@databiosphere/findable-ui/lib/components/Table/features/RowPreview/constants";
import { CoreOptions, getCoreRowModel, RowData } from "@tanstack/react-table";

export const CORE_OPTIONS: Pick<
  CoreOptions<RowData>,
  "_features" | "getCoreRowModel"
> = {
  _features: [ROW_POSITION, ROW_PREVIEW],
  getCoreRowModel: getCoreRowModel(),
};
