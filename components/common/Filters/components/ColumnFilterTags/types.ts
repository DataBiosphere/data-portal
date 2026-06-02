import { RowData, Table } from "@tanstack/react-table";

export interface Props<T extends RowData> {
  table: Table<T>;
}
