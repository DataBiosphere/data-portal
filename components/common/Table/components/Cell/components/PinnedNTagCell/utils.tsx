import { CellContext, RowData } from "@tanstack/react-table";
import { ComponentProps, JSX } from "react";
import {
  PinnedNTagCell,
  PinnedNTagCellProps,
} from "../../../../../../common/NTagCell/components/PinnedNTagCell/pinnedNTagCell";
import { partitionMetadataValues } from "../../../../../../../viewModelBuilders/viewModelBuilders";

/**
 * Builds props for PinnedNTagCell component.
 * @param label - Label for PinnedNTagCell component.
 * @param entityKey - Key of the entity to get values for PinnedNTagCell component.
 * @param pinned - Values to pin to the front.
 * @returns Props for PinnedNTagCell component.
 */
export const buildPinnedNTagProps = <T extends RowData>(
  label: string,
  entityKey: keyof T,
  pinned: string[]
): ((entity: T) => ComponentProps<typeof PinnedNTagCell>) => {
  return (entity): PinnedNTagCellProps => {
    return {
      label,
      values: partitionMetadataValues(
        entity[entityKey] as unknown as string[],
        pinned
      ),
    };
  };
};

/**
 * Returns PinnedNTagCell component.
 * @param propGetter - Fn that returns props for PinnedNTagCell component.
 * @returns PinnedNTagCell component.
 */
export function renderPinnedNTagCell<T extends RowData>(
  propGetter: (data: T) => ComponentProps<typeof PinnedNTagCell>
): (ctx: CellContext<T, unknown>) => JSX.Element {
  const Component = ({ row }: CellContext<T, unknown>): JSX.Element => (
    <PinnedNTagCell {...propGetter(row.original)} />
  );

  Component.displayName = "PinnedNTagCell";

  return Component;
}
