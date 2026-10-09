import { BUTTON_GROUP_PROPS } from "@databiosphere/findable-ui/lib/components/common/ButtonGroup/constants";
import { ColumnFiltersAdapter } from "@databiosphere/findable-ui/lib/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/columnFiltersAdapter";
import { Button } from "@databiosphere/findable-ui/lib/components/Filter/components/surfaces/drawer/components/Button/button";
import { Drawer } from "@databiosphere/findable-ui/lib/components/Filter/components/surfaces/drawer/Drawer/drawer";
import { ColumnFilter } from "@databiosphere/findable-ui/lib/components/Table/components/TableFeatures/ColumnFilter/columnFilter";
import { bpDown1024 } from "@databiosphere/findable-ui/lib/styles/common/mixins/breakpoints";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";
import { Theme, useMediaQuery } from "@mui/material";
import { RowData } from "@tanstack/react-table";
import { ComponentProps, Fragment, JSX } from "react";
import { StyledButton, StyledButtonGroup } from "./columnFilters.styles";
import { Props } from "./types";
import { buildColumnFilters } from "./utils";

export const ColumnFilters = <T extends RowData>({
  table,
}: Props<T>): JSX.Element | null => {
  // Not `noSsr`: the first client render must match the static HTML. Used only
  // as a key, so crossing the breakpoint remounts both surfaces and closes any
  // menu or drawer left open on the surface CSS has just hidden.
  const isDrawer = useMediaQuery((theme: Theme) => bpDown1024({ theme }));

  const enableColumnFilters = table.options.enableColumnFilters;

  if (!enableColumnFilters) return null;

  const columnFilters = buildColumnFilters(table);

  // Both surfaces are rendered and CSS shows one per viewport (see
  // columnFilters.styles.ts), so the static HTML matches the first client render.
  return (
    <Fragment key={String(isDrawer)}>
      <ColumnFiltersAdapter
        table={table}
        renderSurface={(props) => <Drawer Button={renderButton} {...props} />}
      />
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
    </Fragment>
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
