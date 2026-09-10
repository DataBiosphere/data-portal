import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { SVG_ICON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Stack, Typography } from "@mui/material";
import type { JSX } from "react";
import { buildVersionedFileNameValue } from "../../accessor";
import { DOI_BASE_URL, EXTERNAL_LINK_TITLE } from "./constants";
import { StyledNoWrap, StyledOpenInNewIcon } from "./fileNameCell.styles";
import type { Props } from "./types";
import { splitTrailingWord } from "./utils";

/**
 * Pinned cell stacking the published file name over the source study citation.
 * The primary line is the versioned name carried on the dataset asset, so it
 * always matches the file the row's Download button delivers.
 * @param props - Component props.
 * @param props.row - Tracker source dataset.
 * @returns stacked file name and source study cell.
 */
export const FileNameCell = ({ row }: Props): JSX.Element => {
  const { doi, publicationString } = row;
  // Shared with the column's `accessorFn`, so the pinned column always sorts on
  // the value it displays.
  const fileName = buildVersionedFileNameValue(row);
  // Split once - the final word is held on one line with the icon that follows.
  const citation = publicationString
    ? splitTrailingWord(publicationString)
    : null;
  return (
    <Stack spacing={2} useFlexGap>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
        {fileName}
      </Typography>
      {citation && (
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
        >
          {doi ? (
            // Text and icon are one label, so they are a single link target.
            <Link
              label={
                <>
                  {citation.head}
                  <StyledNoWrap>
                    {citation.tail}
                    <StyledOpenInNewIcon
                      fontSize={SVG_ICON_PROPS.FONT_SIZE.XXSMALL}
                      titleAccess={EXTERNAL_LINK_TITLE}
                    />
                  </StyledNoWrap>
                </>
              }
              rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
              target={ANCHOR_TARGET.BLANK}
              // MUI `Link` defaults to `color="primary"` and findable-ui's
              // theme does not override it, so the wrapper's `ink.light` is
              // ignored unless the colour is set on the link itself.
              TypographyProps={{
                color: TYPOGRAPHY_PROPS.COLOR.INK_LIGHT,
              }}
              url={`${DOI_BASE_URL}${doi}`}
            />
          ) : (
            // No DOI, so no link and no external-link affordance.
            publicationString
          )}
        </Typography>
      )}
    </Stack>
  );
};
