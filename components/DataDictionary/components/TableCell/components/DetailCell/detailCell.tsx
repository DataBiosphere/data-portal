import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Grid, Typography } from "@mui/material";
import { TEXT_BODY_500 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { StyledPaper, StyledGrid, StyledStack } from "./detailCell.styles";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { MarkdownRenderer } from "@databiosphere/findable-ui/lib/components/MarkdownRenderer/markdownRenderer";
import { buildExample } from "./utils";

export const DetailCell = ({
  row,
}: CellContext<Attribute, unknown>): JSX.Element => {
  return (
    <StyledGrid container>
      <Grid>
        <Typography variant={TEXT_BODY_500}>Description</Typography>
        <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}>
          <MarkdownRenderer value={row.original.description} />
        </Typography>
      </Grid>
      {row.original.values && (
        <Grid>
          <Typography variant={TEXT_BODY_500}>Allowed Values</Typography>
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}>
            <MarkdownRenderer value={row.original.values} />
          </Typography>
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
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}>
            {row.original.rationale}
          </Typography>
        </Grid>
      )}
      <Grid>
        <Typography variant={TEXT_BODY_500}>Source</Typography>
        <Link {...row.original.source} />
      </Grid>
      {row.original.annotations?.tier && (
        <Grid>
          <Typography variant={TEXT_BODY_500}>Tier</Typography>
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}>
            <MarkdownRenderer value={row.original.annotations.tier as string} />
          </Typography>
        </Grid>
      )}
      {row.original.annotations?.bioNetworks && (
        <Grid>
          <Typography variant={TEXT_BODY_500}>Bionetworks</Typography>
          <Typography variant={TYPOGRAPHY_PROPS.VARIANT.TEXT_BODY_400_2_LINES}>
            <MarkdownRenderer
              value={(row.original.annotations.bioNetworks as string[]).join(
                ", "
              )}
            />
          </Typography>
        </Grid>
      )}
    </StyledGrid>
  );
};
