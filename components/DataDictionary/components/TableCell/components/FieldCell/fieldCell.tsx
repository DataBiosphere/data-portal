import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Chip, Grid, Typography } from "@mui/material";
import { StyledGrid } from "./fieldCell.styles";
import { buildRequired, buildRange } from "./utils";
import { CodeCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/CodeCell/codeCell";
import { getPartialCellContext } from "../../utils";
import { renderRankedCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/RankedCell/utils";
import { MarkdownCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/MarkdownCell/markdownCell";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { GRID_PROPS } from "./constants";

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
          {...getPartialCellContext({
            values: renderRankedCell(table, row, "title", row.original.title),
          })}
        />
      </Typography>
      <Grid {...GRID_PROPS}>
        {/* NAME */}
        <CodeCell
          {...getPartialCellContext(
            <MarkdownCell
              {...getPartialCellContext({
                values: renderRankedCell(table, row, "name", row.original.name),
              })}
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
