import { formatFileSize } from "@databiosphere/findable-ui/lib/utils/formatFileSize";
import React, { Fragment } from "react";
import { DatasetAsset } from "../../../../../../../../../../../@types/network";
import { FileSize } from "./cxgDownloadFileSize.styles";

export interface CXGDownloadFileSizeProps {
  datasetAsset?: DatasetAsset;
}

export const CXGDownloadFileSize = ({
  datasetAsset,
}: CXGDownloadFileSizeProps): JSX.Element => {
  const fileSize = datasetAsset?.fileSize;
  return (
    <Fragment>
      {fileSize && <FileSize>FileSize: {formatFileSize(fileSize)}</FileSize>}
    </Fragment>
  );
};
