import type {} from "@mui/material/Tabs";
import type {} from "@mui/material/styles";

/**
 * Typography definitions.
 */
declare module "@mui/material/styles" {
  interface TypographyVariants {
    "text-heading-xsmall": TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    "text-heading-xsmall"?: TypographyStyleOptions;
  }
}

/**
 * Tabs prop options.
 */
declare module "@mui/material/Tabs" {
  interface TabsPropsIndicatorColorOverrides {
    transparent: true;
  }
}
