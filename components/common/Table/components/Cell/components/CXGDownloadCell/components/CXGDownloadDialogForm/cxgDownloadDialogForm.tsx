import { DialogContentSection } from "@/components/common/Table/components/Actions/components/Dialog/components/DialogContent/components/DialogContentSection/dialogContentSection";
import {
  DialogActions,
  DialogContent,
} from "@/components/common/Table/components/Actions/components/Dialog/dialog.styles";
import { CXG_DATASET_FILE_TYPE, DatasetAsset } from "@/types/network";
import { BUTTON_PRESETS } from "@databiosphere/findable-ui/lib/contracts/mui/Button/presets";
import { Button } from "@mui/material";
import { type JSX, useState } from "react";
import { CXGDownloadCaption } from "./components/CXGDownloadCaption/cxgDownloadCaption";
import { CXGDownloadFileSize } from "./components/CXGDownloadFileSize/cxgDownloadFileSize";
import { CXGDownloadRadio } from "./components/CXGDownloadRadio/cxgDownloadRadio";
import { StyledCode } from "./cxgDownloadDialogForm.styles";

type onCloseFn = () => void;

export interface ExportToDockyardDialogFormProps {
  datasetAssets: DatasetAsset[];
  onClose: onCloseFn;
  title: string;
}

export const CxgDownloadDialogForm = ({
  datasetAssets,
  onClose,
  title: name,
}: ExportToDockyardDialogFormProps): JSX.Element => {
  const [fileFormat, setFileFormat] = useState<CXG_DATASET_FILE_TYPE>(
    CXG_DATASET_FILE_TYPE.H5AD
  );
  const datasetAsset = getSelectedDatasetAsset(datasetAssets, fileFormat);
  const downloadURL = datasetAsset?.downloadURL;

  // Callback fired when file format radio button is selected.
  const onRadioChange = (value: CXG_DATASET_FILE_TYPE): void => {
    setFileFormat(value);
  };

  return (
    <>
      <DialogContent dividers>
        <DialogContentSection title="Atlas name">{name}</DialogContentSection>
        <CXGDownloadRadio
          datasetAssets={datasetAssets}
          fileFormat={fileFormat}
          onRadioChange={onRadioChange}
          title="Data format"
        />
        <DialogContentSection title="Download details">
          <CXGDownloadFileSize datasetAsset={datasetAsset} />
          <CXGDownloadCaption
            isRDS={fileFormat === CXG_DATASET_FILE_TYPE.RDS}
          />
        </DialogContentSection>
        {downloadURL && <StyledCode code={downloadURL} />}
      </DialogContent>
      <DialogActions>
        <Button
          {...BUTTON_PRESETS.PRIMARY_CONTAINED}
          disabled={!downloadURL}
          href={downloadURL}
        >
          Download
        </Button>
        <Button {...BUTTON_PRESETS.SECONDARY_OUTLINED} onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

/**
 * Returns the dataset asset for the given file format.
 * @param datasetAssets - Dataset assets.
 * @param fileFormat - Selected file format.
 * @returns selected dataset asset.
 */
function getSelectedDatasetAsset(
  datasetAssets: DatasetAsset[],
  fileFormat: CXG_DATASET_FILE_TYPE
): DatasetAsset | undefined {
  return datasetAssets.find((asset) => asset.fileType === fileFormat);
}
