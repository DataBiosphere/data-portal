/**
 * Hook utilising Mui's breakpoint helper (media query hook).
 * https://mui.com/material-ui/react-use-media-query/#using-muis-breakpoint-helpers
 */

import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

export enum BREAKPOINT {
  DESKTOP = "desktop",
  MOBILE = "mobile",
  TABLET = "tablet",
}

export enum BREAKPOINT_FN_NAME {
  DOWN = "down",
  UP = "up",
}

type BreakpointFnName = BREAKPOINT_FN_NAME;
type BreakpointKey = Breakpoint | number;

export const useBreakpointHelper = (
  fnName: BreakpointFnName,
  breakpointKey: BreakpointKey
): boolean => {
  return useMediaQuery((theme: Theme) =>
    theme.breakpoints[fnName](breakpointKey)
  );
};
