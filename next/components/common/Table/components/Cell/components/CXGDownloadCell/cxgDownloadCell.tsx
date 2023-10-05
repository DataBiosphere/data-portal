import { DownloadIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { IconButton } from "@clevercanary/data-explorer-ui/lib/components/common/IconButton/iconButton";
import { Box } from "@mui/material";
import { useRef } from "react";

export interface CXGDownloadCellProps {
  url: string;
}

export const CXGDownloadCell = ({ url }: CXGDownloadCellProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // File download.
  const onDownload = (): void => {
    const downloadEl = downloadRef.current;
    if (downloadEl) {
      downloadEl.href = url;
      downloadEl.click();
    }
  };

  return (
    <>
      <IconButton
        color="primary"
        Icon={DownloadIcon}
        onClick={onDownload}
        size="medium"
      />
      <Box component="a" download ref={downloadRef} sx={{ display: "none" }} />
    </>
  );
};
