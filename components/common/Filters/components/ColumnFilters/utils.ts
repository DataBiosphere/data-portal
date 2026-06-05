import { ColumnFiltersTableMeta } from "@databiosphere/findable-ui/lib/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/types";
import { Column, RowData, Table } from "@tanstack/react-table";

/**
 * Returns filterable columns in the order declared by
 * `table.options.meta.categoryGroups`, falling back to the table's column
 * order when no group ordering is configured. Mirrors how the mobile drawer
 * adapter (findable-ui) resolves filter order.
 * @param table - TanStack table instance.
 * @returns filterable columns in display order.
 */
export function buildColumnFilters<T extends RowData>(
  table: Table<T>
): Column<T>[] {
  const { options } = table;
  const { meta } = options;
  const { categoryGroups } = (meta || {}) as ColumnFiltersTableMeta<T>;

  if (!categoryGroups) {
    return table.getAllColumns().filter(({ getCanFilter }) => getCanFilter());
  }

  return categoryGroups
    .flatMap(({ categoryConfigs }) => categoryConfigs)
    .map(({ key }) => table.getColumn(key))
    .filter((column): column is Column<T> => Boolean(column?.getCanFilter()));
}
