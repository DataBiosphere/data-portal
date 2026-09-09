import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Link } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";
import { Stack, Typography } from "@mui/material";
import type { JSX } from "react";
import { DOI_BASE_URL } from "./constants";
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
  const { baseFileName, datasetAsset, doi, publicationString } = row;
  // `versionedFileName` is set for every tracker source dataset, but it is
  // optional on the shared asset type - fall back to the unversioned base name
  // so the pinned column, which identifies the row in the collapsed layout,
  // can never render empty.
  const fileName = datasetAsset?.versionedFileName || baseFileName;
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
          <Link
            label={publicationString}
            rel={REL_ATTRIBUTE.NO_OPENER_NO_REFERRER}
            target={ANCHOR_TARGET.BLANK}
            url={doi ? `${DOI_BASE_URL}${doi}` : ""}
          />
        </Typography>
      )}
    </Stack>
  );
};
