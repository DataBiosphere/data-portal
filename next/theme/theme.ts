import { createTheme, Theme } from "@mui/material";
import * as C from "./common/components";

/**
 * Returns theme with customization.
 * @param theme -- Base theme
 * @returns theme with custom theme overrides.
 */
export function mergeAppTheme(theme: Theme): Theme {
  return createTheme(theme, {
    components: {
      MuiButton: C.MuiButton(theme),
      MuiCssBaseline: C.MuiCssBaseline(theme),
    },
  });
}
