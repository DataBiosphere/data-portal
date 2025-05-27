import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Chip, Typography } from "@mui/material";
import { TEXT_BODY_500 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { StyledGrid } from "./fieldCell.styles";
import { buildRequired, buildRange } from "./utils";

export const FieldCell = ({
  row,
}: CellContext<Attribute, unknown>): JSX.Element => {
  return (
    <StyledGrid>
      <Typography component="div" variant={TEXT_BODY_500}>
        {row.original.title}
      </Typography>
      {row.original.required && <Chip {...buildRequired(row.original)} />}
      <div>{buildRange(row.original)}</div>
    </StyledGrid>
  );
};
