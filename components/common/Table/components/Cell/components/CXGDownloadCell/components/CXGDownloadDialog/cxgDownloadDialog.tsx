import { JSX } from "react";
import { DatasetAsset } from "../../../../../../../../../@types/network";
import {
  DialogTitle,
  StyledDialog,
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
    <StyledDialog fullWidth maxWidth={false} onClose={onClose} open={open}>
      <DialogTitle title="Download from CZ CELLxGENE" onClose={onClose} />
      <DialogForm
        datasetAssets={datasetAssets}
        onClose={onClose}
        title={title}
      />
    </StyledDialog>
  );
};
