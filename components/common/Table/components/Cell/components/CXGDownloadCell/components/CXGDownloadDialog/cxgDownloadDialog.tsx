import {
  DialogTitle,
  StyledDialog,
} from "@/components/common/Table/components/Actions/components/Dialog/dialog.styles";
import { CxgDownloadDialogForm as DialogForm } from "@/components/common/Table/components/Cell/components/CXGDownloadCell/components/CXGDownloadDialogForm/cxgDownloadDialogForm";
import { DatasetAsset } from "@/types/network";
import { JSX } from "react";

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
