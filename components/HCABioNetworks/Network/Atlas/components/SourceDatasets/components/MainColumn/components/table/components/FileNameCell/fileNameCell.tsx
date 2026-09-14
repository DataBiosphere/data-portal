import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Stack, Typography } from "@mui/material";
import type { JSX } from "react";
import { buildVersionedFileNameValue } from "../../accessor";
import { Citation } from "./components/Citation/citation";
import type { Props } from "./types";

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
  return (
    <Stack spacing={2} useFlexGap>
      <Typography variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
        {fileName}
      </Typography>
      {publicationString && (
        <Typography
          color={TYPOGRAPHY_PROPS.COLOR.INK_LIGHT}
          component="div"
          variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400}
        >
          <Citation doi={doi} publicationString={publicationString} />
        </Typography>
      )}
    </Stack>
  );
};
