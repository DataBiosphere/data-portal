import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/components/common/Button/constants";
import { Code as DXCode } from "@databiosphere/findable-ui/lib/components/common/Code/code";
import { formatFileSize } from "@databiosphere/findable-ui/lib/utils/formatFileSize";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { JSX } from "react";
import { DialogContentSection } from "../../../../../Actions/components/Dialog/components/DialogContent/components/DialogContentSection/dialogContentSection";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  StyledDialog,
} from "../../../../../Actions/components/Dialog/dialog.styles";
import type { Props } from "./types";

const DownloadUrlCode = styled(DXCode)`
  flex: none;
  margin: -4px 0 0 0;
  max-height: 200px;
  overflow: auto;
  padding: 8px 16px;
  word-break: break-all;
`;

/**
 * Download dialog for tracker files. Displays the S3 download URL.
 * @param props - Dialog props.
 * @param props.downloadUrl - Static S3 download URL.
 * @param props.fileName - Versioned file name to display.
 * @param props.fileSize - File size in bytes.
 * @param props.format - File format (e.g., ".h5ad").
 * @param props.onClose - Close handler.
 * @param props.open - Whether dialog is open.
 * @returns download dialog.
 */
export const Dialog = ({
  downloadUrl,
  fileName,
  fileSize,
  format,
  onClose,
  open,
}: Props): JSX.Element => {
  return (
    <StyledDialog fullWidth maxWidth={false} onClose={onClose} open={open}>
      <DialogTitle title="Download from HCA Atlas Tracker" onClose={onClose} />
      <DialogContent dividers>
        <DialogContentSection title="Download Details">
          <div>FileName: {fileName}</div>
          <div>Data Format: {format}</div>
          <div>FileSize: {formatFileSize(fileSize)}</div>
        </DialogContentSection>
        {downloadUrl && <DownloadUrlCode code={downloadUrl} />}
      </DialogContent>
      <DialogActions>
        <Button
          {...BUTTON_PROPS.PRIMARY_CONTAINED}
          disabled={!downloadUrl}
          href={downloadUrl}
        >
          Download
        </Button>
        <Button {...BUTTON_PROPS.SECONDARY_CONTAINED} onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
