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
import { buildExample } from "./utils";
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
        column={{ id: COLUMN_IDENTIFIERS.DESCRIPTION }}
        getValue={() => row.original.description}
        row={row}
        table={table}
      />
      <StyledCollapse in={isExpanded}>
        {row.original.values && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>Allowed Values</Typography>
            <StyledMarkdownCell
              column={{ id: COLUMN_IDENTIFIERS.VALUES }}
              getValue={() => row.original.values}
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
              column={{ id: COLUMN_IDENTIFIERS.RATIONALE }}
              getValue={() => row.original.rationale}
              row={row}
              table={table}
            />
          </div>
        )}
        <div>
          <Typography {...TYPOGRAPHY_PROPS}>Source</Typography>
          <LinkCell {...getPartialCellContext(row.original.source)} />
        </div>
        {row.original.annotations?.tier && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>Tier</Typography>
            <StyledMarkdownCell
              column={{ id: COLUMN_IDENTIFIERS.TIER }}
              getValue={() => row.original.annotations?.tier}
              row={row}
              table={table}
            />
          </div>
        )}
        {row.original.annotations?.bioNetworks && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>BioNetworks</Typography>
            <StyledMarkdownCell
              column={{ id: COLUMN_IDENTIFIERS.BIO_NETWORK }}
              getValue={() =>
                (row.original.annotations?.bioNetworks as string[]).join(", ")
              }
              row={row}
              table={table}
            />
          </div>
        )}
        <div>
          <Typography {...TYPOGRAPHY_PROPS}>AnnData Location</Typography>
          <StyledMarkdownCell
            column={{ id: COLUMN_IDENTIFIERS.ANN_DATA_LOCATION }}
            getValue={() =>
              (row.original.annotations?.annDataLocation as string) || "None"
            }
            row={row}
            table={table}
          />
        </div>
      </StyledCollapse>
    </StyledCell>
  );
};
