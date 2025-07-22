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
import { renderRankedCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/RankedCell/utils";
import { StyledMarkdownCell } from "./detailCell.styles";

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
        {...getPartialCellContext({
          values: renderRankedCell(
            table,
            row,
            "description",
            row.original.description
          ),
        })}
      />
      <StyledCollapse in={isExpanded}>
        {row.original.values && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>Allowed Values</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext({
                values: renderRankedCell(
                  table,
                  row,
                  "values",
                  row.original.values
                ),
              })}
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
              {...getPartialCellContext({
                values: renderRankedCell(
                  table,
                  row,
                  "rationale",
                  row.original.rationale
                ),
              })}
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
              {...getPartialCellContext({
                values: row.original.annotations.tier,
              })}
            />
          </div>
        )}
        {row.original.annotations?.bioNetworks && (
          <div>
            <Typography {...TYPOGRAPHY_PROPS}>BioNetworks</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext({
                values: (row.original.annotations.bioNetworks as string[]).join(
                  ", "
                ),
              })}
            />
          </div>
        )}
        <div>
          <Typography {...TYPOGRAPHY_PROPS}>AnnData Location</Typography>
          <StyledMarkdownCell
            {...getPartialCellContext({
              values: renderRankedCell(
                table,
                row,
                "annDataLocation",
                (row.original.annotations?.annDataLocation as string) || "None"
              ),
            })}
          />
        </div>
      </StyledCollapse>
    </StyledCell>
  );
};
