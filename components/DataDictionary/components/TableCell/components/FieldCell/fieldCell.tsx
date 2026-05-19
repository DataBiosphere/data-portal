import { AnchorLink } from "@databiosphere/findable-ui/lib/components/common/AnchorLink/anchorLink";
import { CodeCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/CodeCell/codeCell";
import { MarkdownCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/MarkdownCell/markdownCell";
import { RankedCell } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/RankedCell/rankedCell";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Chip } from "@mui/material";
import { CellContext } from "@tanstack/react-table";
import { JSX } from "react";
import slugify from "slugify";
import { COLUMN_IDENTIFIERS } from "../../../../../../viewModelBuilders/dataDictionaryMapper/columnIds";
import { Attribute } from "../../../../../../viewModelBuilders/dataDictionaryMapper/types";
import { getPartialCellContext } from "../../utils";
import { STACK_PROPS } from "./constants";
import {
  StyledGrid,
  StyledKeyboardArrowRightRounded,
  StyledStack,
  StyledTypography,
} from "./fieldCell.styles";
import { buildLocationName, buildRange, buildRequired } from "./utils";

export const FieldCell = ({
  row,
  table,
}: CellContext<Attribute, unknown>): JSX.Element => {
  const isExpanded = row.getIsExpanded();
  return (
    <StyledGrid>
      <StyledKeyboardArrowRightRounded
        aria-hidden
        fontSize={SVG_ICON_PROPS.FONT_SIZE.SMALL}
        isExpanded={isExpanded}
      />
      {/* TITLE */}
      <StyledTypography
        component="div"
        variant={TYPOGRAPHY_PROPS.VARIANT.BODY_500}
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
            anchorLink={slugify(row.original.name)}
            onClick={(e) => e.stopPropagation()}
          />
        </RankedCell>
      </StyledTypography>
      <StyledStack {...STACK_PROPS}>
        {/* NAME */}
        {buildLocationName(row).map((name) => (
          <CodeCell
            key={name}
            {...getPartialCellContext(
              <MarkdownCell
                {...getPartialCellContext(
                  name,
                  COLUMN_IDENTIFIERS.LOCATION_NAME
                )}
                row={row}
                table={table}
              />
            )}
          />
        ))}
        {/* REQUIRED */}
        <Chip {...buildRequired(row)} />
      </StyledStack>
      {/* RANGE */}
      <StyledTypography>{buildRange(row.original)}</StyledTypography>
    </StyledGrid>
  );
};
