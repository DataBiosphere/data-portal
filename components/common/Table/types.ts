import { BaseComponentProps } from "@databiosphere/findable-ui/lib/components/types";
import { RowData, Table } from "@tanstack/react-table";

export interface Props<T extends RowData> extends BaseComponentProps {
  table: Table<T>;
}
