import { ColumnFilterTag } from "@databiosphere/findable-ui/lib/components/Table/components/TableFeatures/ColumnFilter/components/ColumnFilterTag/columnFilterTag";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";
import { Button, Theme, useMediaQuery } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { JSX } from "react";
import { StyledGrid } from "./columnFilterTags.styles";
import { GRID_PROPS } from "./constants";
import { Props } from "./types";

export const ColumnFilterTags = <T extends RowData>({
  table,
}: Props<T>): JSX.Element | null => {
  const { getAllColumns, resetColumnFilters } = table;
  const columns = getAllColumns().filter((column) => column.getIsFiltered());
  const isDrawer = useMediaQuery(
    (theme: Theme) => theme.breakpoints.down(820),
    { noSsr: true }
  );

  if (columns.length === 0) return null;

  if (isDrawer) return null;

  return (
    <StyledGrid {...GRID_PROPS}>
      {columns.map((column) => (
        <ColumnFilterTag key={column.id} column={column} />
      ))}
      <Button
        onClick={() => resetColumnFilters(true)}
        variant={BUTTON_PROPS.VARIANT.TEXT}
      >
        Clear all
      </Button>
    </StyledGrid>
  );
};
