import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Grid, Typography } from "@mui/material";
import { TEXT_BODY_500 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import {
  StyledPaper,
  StyledCell,
  StyledStack,
  StyledCollapse,
  StyledButton,
} from "./detailCell.styles";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { buildExample } from "./utils";
import { useState } from "react";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";
import { getPartialCellContext } from "../../utils";
import { renderRankedCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/RankedCell/utils";
import { StyledMarkdownCell } from "./detailCell.styles";

export const DetailCell = ({
  row,
  table,
}: CellContext<Attribute, unknown>): JSX.Element => {
  const [isIn, setIsIn] = useState(false);
  return (
    <StyledCell>
      <Grid>
        <Typography variant={TEXT_BODY_500}>Description</Typography>
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
      </Grid>
      <StyledCollapse in={isIn}>
        {row.original.values && (
          <Grid>
            <Typography variant={TEXT_BODY_500}>Allowed Values</Typography>
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
          </Grid>
        )}
        {row.original.example && (
          <Grid>
            <Typography variant={TEXT_BODY_500}>Example</Typography>
            <StyledStack direction="row">
              {buildExample(row.original).map((example, i) => (
                <StyledPaper key={i} elevation={0}>
                  {example}
                </StyledPaper>
              ))}
            </StyledStack>
          </Grid>
        )}
        {row.original.rationale && (
          <Grid>
            <Typography variant={TEXT_BODY_500}>Rationale</Typography>
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
          </Grid>
        )}
        <Grid>
          <Typography variant={TEXT_BODY_500}>Source</Typography>
          <Link {...row.original.source} />
        </Grid>
        {row.original.annotations?.tier && (
          <Grid>
            <Typography variant={TEXT_BODY_500}>Tier</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext({
                values: row.original.annotations.tier,
              })}
            />
          </Grid>
        )}
        {row.original.annotations?.bioNetworks && (
          <Grid>
            <Typography variant={TEXT_BODY_500}>BioNetworks</Typography>
            <StyledMarkdownCell
              {...getPartialCellContext({
                values: (row.original.annotations.bioNetworks as string[]).join(
                  ", "
                ),
              })}
            />
          </Grid>
        )}
        <Grid>
          <Typography variant={TEXT_BODY_500}>AnnData Location</Typography>
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
        </Grid>
      </StyledCollapse>
      <StyledButton
        onClick={() => setIsIn((i) => !i)}
        variant={BUTTON_PROPS.VARIANT.TEXT}
      >
        {isIn ? "Show less" : "Show more"}
      </StyledButton>
    </StyledCell>
  );
};
