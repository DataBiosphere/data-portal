import { DialogTitle as DXDialogTitle } from "@clevercanary/data-explorer-ui/lib/components/common/Dialog/components/DialogTitle/dialogTitle";
import styled from "@emotion/styled";
import {
  Dialog as MDialog,
  DialogActions as MDialogActions,
  DialogContent as MDialogContent,
} from "@mui/material";

export const Dialog = styled(MDialog)`
  .MuiDialog-paper {
    max-width: 544px;
  }
`;

export const DialogTitle = styled(DXDialogTitle)`
  padding: 16px 20px;
`;

export const DialogContent = styled(MDialogContent)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const DialogActions = styled(MDialogActions)`
  gap: 12px;
  justify-content: flex-start;
  padding: 16px 20px;

  button:not(:first-of-type) {
    margin: 0;
  }
`;
