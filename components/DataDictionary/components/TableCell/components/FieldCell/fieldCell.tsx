import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Chip, Grid, Typography } from "@mui/material";
import { StyledGrid } from "./fieldCell.styles";
import { buildRequired, buildRange } from "./utils";
import { CodeCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/CodeCell/codeCell";
import { MarkdownCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/MarkdownCell/markdownCell";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { GRID_PROPS } from "./constants";
import { COLUMN_IDENTIFIERS } from "../../../../../../viewModelBuilders/dataDictionaryMapper/columnIds";
import { getPartialCellContext } from "../../utils";

export const FieldCell = ({
  row,
  table,
}: CellContext<Attribute, unknown>): JSX.Element => {
  return (
    <StyledGrid>
      {/* TITLE */}
      <Typography
        component="div"
        variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_500}
      >
        <MarkdownCell
          column={{ id: COLUMN_IDENTIFIERS.TITLE }}
          getValue={() => row.original.title}
          row={row}
          table={table}
        />
      </Typography>
      <Grid {...GRID_PROPS}>
        {/* NAME */}
        <CodeCell
          {...getPartialCellContext(
            <MarkdownCell
              column={{ id: COLUMN_IDENTIFIERS.NAME }}
              getValue={() => row.original.name}
              row={row}
              table={table}
            />
          )}
        />
        {/* REQUIRED */}
        {row.original.required && <Chip {...buildRequired(row.original)} />}
      </Grid>
      {/* RANGE */}
      <div>{buildRange(row.original)}</div>
    </StyledGrid>
  );
};
