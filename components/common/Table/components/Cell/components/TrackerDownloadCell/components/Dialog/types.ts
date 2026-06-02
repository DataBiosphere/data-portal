export interface Props {
  downloadUrl: string;
  fileName: string;
  fileSize: number;
  format: string;
  onClose: () => void;
  open: boolean;
}
