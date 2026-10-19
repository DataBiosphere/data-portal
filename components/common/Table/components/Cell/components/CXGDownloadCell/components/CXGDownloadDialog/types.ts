import type { DatasetAsset } from "@/types/network";

type onCloseFn = () => void;

export interface CXGDownloadDialogProps {
  datasetAssets: DatasetAsset[];
  onClose: onCloseFn;
  open: boolean;
  title: string;
}
