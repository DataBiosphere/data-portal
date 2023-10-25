import { alpha08 } from "@clevercanary/data-explorer-ui/lib/theme/common/palette";
import {
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
  TEXT_BODY_LARGE_500,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { Components, Theme } from "@mui/material";

/**
 * MuiButton Component
 * @param theme - Theme.
 * @returns MuiButton component theme styles.
 */
export const MuiButton = (theme: Theme): Components["MuiButton"] => {
  return {
    styleOverrides: {
      containedPrimary: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}${alpha08}`,
        color: theme.palette.common.white,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}${alpha08}`,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:active": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}${alpha08}`,
        },
        "&:disabled": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: `0 1px 0 0 #003E76`,
          color: theme.palette.common.white,
          opacity: 0.5,
        },
      },
    },
  };
};

/**
 * MuiCssBaseline Component
 * @param theme - Theme.
 * @returns MuiCssBaseline component theme styles.
 */
export const MuiCssBaseline = (theme: Theme): Components["MuiCssBaseline"] => {
  return {
    styleOverrides: {
      body: {
        ...theme.typography[TEXT_BODY_400_2_LINES],
      },
      h3: {
        ...theme.typography[TEXT_BODY_LARGE_500],
        margin: "0 0 8px",
      },
      h4: {
        ...theme.typography[TEXT_BODY_500],
        margin: "0 0 8px",
      },
      li: {
        margin: "4px 0",
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:last-child": {
          marginBottom: 0,
        },
      },
      ol: {
        margin: 0,
        paddingLeft: 24,
      },
      p: {
        ...theme.typography[TEXT_BODY_400_2_LINES],
        marginBottom: 8,
      },
      "p code": {
        backgroundColor: theme.palette.smoke.light,
        fontSize: "inherit",
      },
      ul: {
        margin: 0,
        paddingLeft: 24,
      },
    },
  };
};

/**
 * MuiIconButton Component
 * @param theme - Theme.
 * @returns MuiIconButton component theme styles.
 */
export const MuiIconButton = (theme: Theme): Components["MuiIconButton"] => {
  return {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 1px 0 0 ${theme.palette.primary.dark}`,
        color: theme.palette.common.white,
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&:active": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: "none",
        },
        // eslint-disable-next-line sort-keys -- disabling key order for readability
        "&.Mui-disabled": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          opacity: 0.5,
        },
      },
      sizeMedium: {
        padding: "6px 8px",
      },
    },
  };
};
