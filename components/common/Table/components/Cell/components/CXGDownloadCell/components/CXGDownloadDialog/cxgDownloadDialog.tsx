import {
  DialogTitle,
  StyledDialog,
} from "@/components/common/Table/components/Actions/components/Dialog/dialog.styles";
import { CxgDownloadDialogForm as DialogForm } from "@/components/common/Table/components/Cell/components/CXGDownloadCell/components/CXGDownloadDialogForm/cxgDownloadDialogForm";
import { JSX } from "react";
import { ARIA_LABEL } from "./constants";
import type { CXGDownloadDialogProps } from "./types";

export const CXGDownloadDialog = ({
  datasetAssets,
  onClose,
  open,
  title,
}: CXGDownloadDialogProps): JSX.Element => {
  return (
    <StyledDialog fullWidth maxWidth={false} onClose={onClose} open={open}>
      <DialogTitle
        closeLabel={ARIA_LABEL.CLOSE}
        onClose={onClose}
        title="Download from CZ CELLxGENE"
      />
      <DialogForm
        datasetAssets={datasetAssets}
        onClose={onClose}
        title={title}
      />
    </StyledDialog>
  );
};
