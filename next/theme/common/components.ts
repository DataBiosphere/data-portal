import { TEXT_BODY_400_2_LINES } from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Components, Theme } from "@mui/material";

/**
 * MuiCssBaseline Component
 * @param theme - Theme.
 * @returns MuiCssBaseline component theme styles.
 */
export const MuiCssBaseline = (theme: Theme): Components["MuiCssBaseline"] => {
  return {
    styleOverrides: {
      p: {
        ...theme.typography[TEXT_BODY_400_2_LINES],
        marginBottom: 16,
      },
    },
  };
};
