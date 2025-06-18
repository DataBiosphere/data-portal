import { CellContext } from "@tanstack/react-table";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { Chip, Typography } from "@mui/material";
import { TEXT_BODY_500 } from "@databiosphere/findable-ui/lib/theme/common/typography";
import { StyledGrid } from "./fieldCell.styles";
import { buildRequired, buildRange } from "./utils";
import { CodeCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/CodeCell/codeCell";
import { getPartialCellContext } from "../../utils";

export const FieldCell = ({
  row,
}: CellContext<Attribute, unknown>): JSX.Element => {
  return (
    <StyledGrid>
      <Typography component="div" variant={TEXT_BODY_500}>
        {row.original.title}
      </Typography>
      <Typography component="div" variant={TEXT_BODY_500}>
        <CodeCell {...getPartialCellContext(row.original.name)} />
      </Typography>
      {row.original.required && <Chip {...buildRequired(row.original)} />}
      <div>{buildRange(row.original)}</div>
    </StyledGrid>
  );
};
