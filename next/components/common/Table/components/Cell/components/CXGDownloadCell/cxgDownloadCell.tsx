import { DownloadIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { IconButton } from "@databiosphere/findable-ui/lib/components/common/IconButton/iconButton";
import { useState } from "react";
import { DatasetAsset } from "../../../../../../../@types/network";
import { CXGDownloadDialog } from "./components/CXGDownloadDialog/cxgDownloadDialog";

export interface CXGDownloadCellProps {
  datasetAssets: DatasetAsset[];
  title: string;
}

export const CXGDownloadCell = ({
  datasetAssets,
  title,
}: CXGDownloadCellProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <IconButton
        color="primary"
        disabled={datasetAssets.length === 0}
        Icon={DownloadIcon}
        onClick={(): void => setOpen(true)}
        size="medium"
      />
      <CXGDownloadDialog
        datasetAssets={datasetAssets}
        onClose={(): void => setOpen(false)}
        open={open}
        title={title}
      />
    </>
  );
};
