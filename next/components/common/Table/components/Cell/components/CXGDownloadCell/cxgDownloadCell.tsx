import { DownloadIcon } from "@clevercanary/data-explorer-ui/lib/components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { IconButton } from "@clevercanary/data-explorer-ui/lib/components/common/IconButton/iconButton";
import { Box } from "@mui/material";
import { useRef } from "react";
import { CXGDownloadURL } from "../../../../../../../@types/network";

export interface CXGDownloadCellProps {
  cxgDownloadURL: CXGDownloadURL;
}

export const CXGDownloadCell = ({
  cxgDownloadURL,
}: CXGDownloadCellProps): JSX.Element => {
  const downloadRef = useRef<HTMLAnchorElement>(null);

  // File download.
  const onDownload = (): void => {
    const downloadEl = downloadRef.current;
    if (downloadEl && cxgDownloadURL.h5ad) {
      downloadEl.href = cxgDownloadURL.h5ad;
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
