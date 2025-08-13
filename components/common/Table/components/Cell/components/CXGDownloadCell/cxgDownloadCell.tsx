import { DownloadIcon } from "@databiosphere/findable-ui/lib/components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { useState } from "react";
import { DatasetAsset } from "../../../../../../../@types/network";
import { CXGDownloadDialog } from "./components/CXGDownloadDialog/cxgDownloadDialog";
import { StyledIconButton } from "./cxgDownloadCell.styles";
import { ICON_BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/iconButton";

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
      {datasetAssets.length > 0 && (
        <StyledIconButton
          color={ICON_BUTTON_PROPS.COLOR.PRIMARY}
          disabled={datasetAssets.length === 0}
          onClick={(): void => setOpen(true)}
          size={ICON_BUTTON_PROPS.SIZE.MEDIUM}
        >
          <DownloadIcon />
        </StyledIconButton>
      )}
      <CXGDownloadDialog
        datasetAssets={datasetAssets}
        onClose={(): void => setOpen(false)}
        open={open}
        title={title}
      />
    </>
  );
};
