import React from "react";
import { Caption } from "./cxgDownloadCaption.styles";

export const CXGDownloadCaption = (): JSX.Element => {
  return (
    <Caption>
      This download link permanently references this version of the dataset. If
      this dataset is updated, a new download link will be created that
      permanently references the next version of this dataset.
    </Caption>
  );
};
