import { Grid } from "@databiosphere/findable-ui/lib/components/common/Grid/grid";
import {
  TEXT_BODY_400,
  TEXT_BODY_LARGE_500,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Typography } from "@mui/material";
import React from "react";
import {
  CXG_DATASET_FILE_TYPE,
  DatasetAsset,
} from "../../../../../../../../../../../@types/network";
import { RadioGroup } from "./cxgDownloadRadio.styles";

const H5AD_FILE_FORMAT = ".h5ad";
const RDS_FILE_FORMAT = ".rds";

export interface CXGDownloadRadioProps {
  datasetAssets: DatasetAsset[];
  fileFormat: CXG_DATASET_FILE_TYPE;
  onRadioChange: (value: CXG_DATASET_FILE_TYPE) => void;
  title: string;
}

export const CXGDownloadRadio = ({
  datasetAssets,
  fileFormat,
  onRadioChange,
  title,
}: CXGDownloadRadioProps): JSX.Element => {
  const isH5AD = isDatasetAsset(datasetAssets, CXG_DATASET_FILE_TYPE.H5AD);
  const isRDS = isDatasetAsset(datasetAssets, CXG_DATASET_FILE_TYPE.RDS);
  return (
    <Grid gridSx={{ gap: isRDS ? 4 : 1 }}>
      <Typography variant={TEXT_BODY_LARGE_500}>{title}</Typography>
      {isRDS ? (
        <RadioGroup
          onRadioChange={onRadioChange}
          radios={[
            {
              disabled: !isH5AD,
              label: H5AD_FILE_FORMAT,
              value: CXG_DATASET_FILE_TYPE.H5AD,
            },
            {
              disabled: !isRDS,
              label: RDS_FILE_FORMAT,
              value: CXG_DATASET_FILE_TYPE.RDS,
            },
          ]}
          value={fileFormat}
        />
      ) : (
        <Typography
          component="div"
          gutterBottom={false}
          variant={TEXT_BODY_400}
        >
          {H5AD_FILE_FORMAT}
        </Typography>
      )}
    </Grid>
  );
};

/**
 * Returns true if dataset asset exists for the given file type.
 * @param datasetAssets - Dataset assets.
 * @param fileType - File type.
 * @returns true if dataset asset exists for file type.
 */
function isDatasetAsset(
  datasetAssets: DatasetAsset[],
  fileType: CXG_DATASET_FILE_TYPE
): boolean {
  return datasetAssets.some((asset) => asset.fileType === fileType);
}
