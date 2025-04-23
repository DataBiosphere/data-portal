import {
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
  TEXT_BODY_LARGE_500,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { Components, Theme } from "@mui/material";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { COLOR_MIXES } from "@databiosphere/findable-ui/lib/styles/common/constants/colorMixes";
import { BUTTON_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/button";

/**
 * MuiButton Component
 */
export const MuiButton: Components["MuiButton"] = {
  styleOverrides: {
    root: {
      variants: [
        {
          props: {
            color: BUTTON_PROPS.COLOR.PRIMARY,
            variant: BUTTON_PROPS.VARIANT.CONTAINED,
          },
          style: {
            backgroundColor: PALETTE.PRIMARY_MAIN,
            boxShadow: `0 1px 0 0 ${COLOR_MIXES.PRIMARY_DARK_08}`,
            color: PALETTE.COMMON_WHITE,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:hover": {
              backgroundColor: PALETTE.PRIMARY_DARK,
              boxShadow: `0 1px 0 0 ${COLOR_MIXES.PRIMARY_DARK_08}`,
            },
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:active": {
              backgroundColor: PALETTE.PRIMARY_DARK,
              boxShadow: `0 1px 0 0 ${COLOR_MIXES.PRIMARY_DARK_08}`,
            },
            "&:disabled": {
              backgroundColor: PALETTE.PRIMARY_DARK,
              boxShadow: `0 1px 0 0 #003E76`,
              color: PALETTE.COMMON_WHITE,
              opacity: 0.5,
            },
          },
        },
      ],
    },
  },
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
        backgroundColor: PALETTE.SMOKE_LIGHT,
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
 */
export const MuiIconButton: Components["MuiIconButton"] = {
  styleOverrides: {
    colorPrimary: {
      backgroundColor: PALETTE.PRIMARY_MAIN,
      boxShadow: `0 1px 0 0 ${PALETTE.PRIMARY_DARK}`,
      color: PALETTE.COMMON_WHITE,
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:hover": {
        backgroundColor: PALETTE.PRIMARY_DARK,
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&:active": {
        backgroundColor: PALETTE.PRIMARY_DARK,
        boxShadow: "none",
      },
      // eslint-disable-next-line sort-keys -- disabling key order for readability
      "&.Mui-disabled": {
        backgroundColor: PALETTE.PRIMARY_MAIN,
        color: PALETTE.COMMON_WHITE,
        opacity: 0.5,
      },
    },
    sizeMedium: {
      padding: "6px 8px",
    },
  },
};
