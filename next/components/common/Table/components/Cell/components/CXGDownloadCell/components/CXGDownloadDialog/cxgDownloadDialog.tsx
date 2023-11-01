import React from "react";
import { DatasetAsset } from "../../../../../../../../../@types/network";
import {
  Dialog,
  DialogTitle,
} from "../../../../../Actions/components/Dialog/dialog.styles";
import { CxgDownloadDialogForm as DialogForm } from "../CXGDownloadDialogForm/cxgDownloadDialogForm";

type onCloseFn = () => void;

export interface CXGDownloadDialogProps {
  datasetAssets: DatasetAsset[];
  onClose: onCloseFn;
  open: boolean;
  title: string;
}

export const CXGDownloadDialog = ({
  datasetAssets,
  onClose,
  open,
  title,
}: CXGDownloadDialogProps): JSX.Element => {
  return (
    <Dialog fullWidth maxWidth={false} onClose={onClose} open={open}>
      <DialogTitle title="Download from CELLxGENE" onClose={onClose} />
      <DialogForm
        datasetAssets={datasetAssets}
        onClose={onClose}
        title={title}
      />
    </Dialog>
  );
};
