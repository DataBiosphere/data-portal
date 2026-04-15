import { NTagCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/nTagCell";
import { CellContext, RowData } from "@tanstack/react-table";
import { ComponentProps, JSX } from "react";

/**
 * Builds props for NTagCell component.
 * @param label - Label for NTagCell component.
 * @param entityKey - Key of the entity to get values for NTagCell component.
 * @returns Props for NTagCell component.
 */
export const buildNTagProps = <T extends RowData>(
  label: string,
  entityKey: keyof T
): ((entity: T) => ComponentProps<typeof NTagCell>) => {
  return (entity): ComponentProps<typeof NTagCell> => {
    return {
      label,
      values: entity[entityKey] as unknown as string[],
    };
  };
};

/**
 * Returns NTagCell component.
 * @param propGetter - Fn that returns props for NTagCell component.
 * @returns NTagCell component.
 */
export function renderNTagCell<T extends RowData>(
  propGetter: (data: T) => ComponentProps<typeof NTagCell>
): (ctx: CellContext<T, unknown>) => JSX.Element {
  const Component = ({ row }: CellContext<T, unknown>): JSX.Element => (
    <NTagCell {...propGetter(row.original)} />
  );

  Component.displayName = "NTagCell";

  return Component;
}
