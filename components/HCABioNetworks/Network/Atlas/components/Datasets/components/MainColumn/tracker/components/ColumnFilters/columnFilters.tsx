import { BUTTON_GROUP_PROPS } from "@databiosphere/findable-ui/lib/components/common/buttonGroup/constants";
import { ColumnFiltersAdapter } from "@databiosphere/findable-ui/lib/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/columnFiltersAdapter";
import { Button } from "@databiosphere/findable-ui/lib/components/Filter/components/surfaces/drawer/components/Button/button";
import { Drawer } from "@databiosphere/findable-ui/lib/components/Filter/components/surfaces/drawer/Drawer/drawer";
import { ColumnFilter } from "@databiosphere/findable-ui/lib/components/Table/components/TableFeatures/ColumnFilter/columnFilter";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";
import { Theme, useMediaQuery } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { ComponentProps, JSX } from "react";
import { StyledButton, StyledButtonGroup } from "./columnFilters.styles";
import { Props } from "./types";

export const ColumnFilters = <T extends RowData>({
  table,
}: Props<T>): JSX.Element | null => {
  const columns = table.getAllColumns();
  const columnFilters = columns.filter((column) => column.getCanFilter());
  const enableColumnFilters = table.options.enableColumnFilters;
  const isDrawer = useMediaQuery(
    (theme: Theme) => theme.breakpoints.down(820),
    { noSsr: true }
  );

  if (!enableColumnFilters) return null;

  if (isDrawer)
    return (
      <ColumnFiltersAdapter
        table={table}
        renderSurface={(props) => <Drawer Button={renderButton} {...props} />}
      />
    );

  return (
    <StyledButtonGroup {...BUTTON_GROUP_PROPS.SECONDARY_OUTLINED}>
      {columnFilters.map((column) => (
        <ColumnFilter
          key={column.id}
          column={column}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
        />
      ))}
    </StyledButtonGroup>
  );
};

/**
 * Renders the drawer's open button with the specified size.
 * @param props - Button props.
 * @returns Button.
 */
function renderButton(props: ComponentProps<typeof Button>): JSX.Element {
  return <StyledButton size={BUTTON_PROPS.SIZE.LARGE} {...props} />;
}
