import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Chip, Typography } from "@mui/material";
import { TEXT_BODY_500 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { StyledGrid } from "./fieldCell.styles";
import { buildRequired, buildRange } from "./utils";
import { CodeCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/CodeCell/codeCell";
import { getPartialCellContext } from "../../utils";
import { renderRankedCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/RankedCell/utils";
import { MarkdownCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/MarkdownCell/markdownCell";

export const FieldCell = ({
  row,
  table,
}: CellContext<Attribute, unknown>): JSX.Element => {
  return (
    <StyledGrid>
      {/* TITLE */}
      <Typography component="div" variant={TEXT_BODY_500}>
        <MarkdownCell
          {...getPartialCellContext({
            values: renderRankedCell(table, row, "title", row.original.title),
          })}
        />
      </Typography>
      {/* NAME */}
      {/* @ts-expect-error -- TODO see https://github.com/DataBiosphere/findable-ui/issues/540 */}
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
      {/* RANGE */}
      <div>{buildRange(row.original)}</div>
    </StyledGrid>
  );
};
