import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Collapse, Typography } from "@mui/material";
import { TYPOGRAPHY_PROPS } from "./constants";
import {
  StyledPaper,
  StyledCell,
  StyledStack,
  StyledCollapse,
} from "./detailCell.styles";
import { LinkCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/LinkCell/linkCell";
import {
  buildAnnDataLocation,
  buildBioNetworks,
  buildExample,
  buildSource,
  shouldShowAnnDataLocationColumn,
} from "./utils";
import { getPartialCellContext } from "../../utils";
import { StyledMarkdownCell } from "./detailCell.styles";
import { COLUMN_IDENTIFIERS } from "../../../../../../viewModelBuilders/dataDictionaryMapper/columnIds";

export const DetailCell = ({
  row,
  table,
}: CellContext<Attribute, unknown>): JSX.Element => {
  const { getIsExpanded } = row;
  const isExpanded = getIsExpanded();
  return (
    <StyledCell>
      <Collapse in={isExpanded}>
        <Typography {...TYPOGRAPHY_PROPS}>Description</Typography>
      </Collapse>
      <StyledMarkdownCell
        {...getPartialCellContext(
          row.original.description,
          COLUMN_IDENTIFIERS.DESCRIPTION
        )}
        row={row}
        table={table}
      />
      <StyledCollapse in={isExpanded}>
        {row.original.values && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>Allowed Values</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext(
                row.original.values,
                COLUMN_IDENTIFIERS.VALUES
              )}
              row={row}
              table={table}
            />
          </div>
        )}
        {row.original.example && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>Example</Typography>
            <StyledStack direction="row">
              {buildExample(row.original).map((example, i) => (
                <StyledPaper key={i} elevation={0}>
                  {example}
                </StyledPaper>
              ))}
            </StyledStack>
          </div>
        )}
        {row.original.rationale && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>Rationale</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext(
                row.original.rationale,
                COLUMN_IDENTIFIERS.RATIONALE
              )}
              row={row}
              table={table}
            />
          </div>
        )}
        <div>
          <Typography {...TYPOGRAPHY_PROPS}>Source</Typography>
          <LinkCell {...getPartialCellContext(buildSource(row))} />
        </div>
        {row.original.annotations?.bioNetworks && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>BioNetworks</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext(
                buildBioNetworks(row),
                COLUMN_IDENTIFIERS.BIO_NETWORK
              )}
              row={row}
              table={table}
            />
          </div>
        )}
        {shouldShowAnnDataLocationColumn(table) && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>AnnData Location</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext(
                buildAnnDataLocation(row),
                COLUMN_IDENTIFIERS.ANN_DATA_LOCATION
              )}
              row={row}
              table={table}
            />
          </div>
        )}
      </StyledCollapse>
    </StyledCell>
  );
};
