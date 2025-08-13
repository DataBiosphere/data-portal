import { Components, ThemeOptions } from "@mui/material";
import { PALETTE } from "@databiosphere/findable-ui/lib/styles/common/constants/palette";
import { FONT } from "@databiosphere/findable-ui/lib/styles/common/constants/font";

const MuiCssBaseline: Components["MuiCssBaseline"] = {
  styleOverrides: {
    body: {
      font: FONT.BODY_400_2_LINES,
    },
    h3: {
      font: FONT.BODY_LARGE_500,
      margin: "0 0 8px",
    },
    h4: {
      font: FONT.BODY_500,
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

export const components: ThemeOptions["components"] = {
  MuiCssBaseline,
};
