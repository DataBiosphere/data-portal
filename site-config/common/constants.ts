import { BreakpointKey } from "@databiosphere/findable-ui/lib/hooks/useBreakpointHelper";
import { Breakpoints } from "@mui/system";

export const BREAKPOINTS: Partial<Breakpoints> = {
  values: {
    lg: 1440,
    md: 1280,
    sm: 1024,
    xs: 0,
  } as Breakpoints["values"], // TODO(cc) add "xl" breakpoint.
};

export const FLATTEN: Record<
  string,
  Partial<Record<BreakpointKey, boolean>>
> = {
  MD_DOWN: { sm: true, xs: true },
  XS_ONLY: { xs: true },
};

export const VISIBLE: Record<
  string,
  Partial<Record<BreakpointKey, boolean>>
> = {
  BETWEEN_SM_AND_LG: { lg: false, xs: false },
  MD_DOWN: { lg: false, md: false },
  NEVER: { lg: false, md: false, sm: false, xs: false },
};
