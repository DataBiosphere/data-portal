import { DownloadIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { ICON_BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/iconButton";
import { useDialog } from "@databiosphere/findable-ui/src/components/common/Dialog/hooks/useDialog";
import { Fragment, JSX } from "react";
import { StyledIconButton } from "../CXGDownloadCell/cxgDownloadCell.styles";
import { Dialog } from "./components/Dialog/dialog";
import type { TrackerDownloadCellProps } from "./types";

/**
 * Download cell for tracker files. Renders a download icon button
 * that opens a dialog displaying the S3 download URL.
 * @param props - Download cell props.
 * @param props.downloadUrl - Static S3 download URL.
 * @param props.fileName - Versioned file name to display.
 * @param props.fileSize - File size in bytes.
 * @param props.format - File format (e.g., ".h5ad").
 * @returns download icon button with dialog.
 */
export const TrackerDownloadCell = ({
  downloadUrl,
  fileName,
  fileSize,
  format,
}: TrackerDownloadCellProps): JSX.Element => {
  const { onClose, onOpen, open } = useDialog();
  return (
    <Fragment>
      <StyledIconButton
        color={ICON_BUTTON_PROPS.COLOR.PRIMARY}
        disabled={!downloadUrl}
        onClick={onOpen}
        size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
      >
        <DownloadIcon />
      </StyledIconButton>
      <Dialog
        downloadUrl={downloadUrl}
        fileName={fileName}
        fileSize={fileSize}
        format={format}
        onClose={onClose}
        open={open}
      />
    </Fragment>
  );
};
