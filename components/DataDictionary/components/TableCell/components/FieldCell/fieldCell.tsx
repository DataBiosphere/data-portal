import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Chip, Grid } from "@mui/material";
import { StyledGrid } from "./fieldCell.styles";
import { buildRequired, buildRange } from "./utils";
import { CodeCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/CodeCell/codeCell";
import { MarkdownCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/MarkdownCell/markdownCell";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { GRID_PROPS } from "./constants";
import { COLUMN_IDENTIFIERS } from "../../../../../../viewModelBuilders/dataDictionaryMapper/columnIds";
import { getPartialCellContext } from "../../utils";
import { AnchorLink } from "@databiosphere/findable-ui/lib/components/common/AnchorLink/anchorLink";
import { StyledTypography } from "./fieldCell.styles";
import { RankedCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/RankedCell/rankedCell";

export const FieldCell = ({
  row,
  table,
}: CellContext<Attribute, unknown>): JSX.Element => {
  return (
    <StyledGrid>
      {/* TITLE */}
      <StyledTypography
        component="div"
        variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_500}
      >
        <RankedCell
          {...getPartialCellContext(
            row.original.title,
            COLUMN_IDENTIFIERS.TITLE
          )}
          row={row}
          table={table}
        >
          <AnchorLink
            anchorLink={row.original.name}
            onClick={(e) => e.stopPropagation()}
          />
        </RankedCell>
      </StyledTypography>
      <Grid {...GRID_PROPS}>
        {/* NAME */}
        <CodeCell
          {...getPartialCellContext(
            <MarkdownCell
              {...getPartialCellContext(
                row.original.locationName,
                COLUMN_IDENTIFIERS.LOCATION_NAME
              )}
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
