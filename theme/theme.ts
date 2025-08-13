import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { Theme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { components as appComponents } from "./common/components";

/**
 * Returns Data Portal customized theme.
 * @param baseThemeOptions - Base theme options.
 * @param themeOptions - Custom theme option overrides.
 * @returns theme with custom theme overrides.
 */
export function mergeAppTheme(
  baseThemeOptions?: ThemeOptions,
  themeOptions?: ThemeOptions
): Theme {
  // Extract components and options from base and custom themes.
  // Default to empty objects if undefined for deepmerge.
  const { components: baseComponents = {}, ...baseOptions } =
    baseThemeOptions || {};
  const { components: customComponents = {}, ...customOptions } =
    themeOptions || {};

  // Merge components in order of base, app, and custom.
  const components = deepmerge(
    deepmerge(baseComponents, appComponents),
    customComponents
  );

  // Merge custom options (palette, shadows, typography).
  const options = deepmerge(baseOptions, customOptions);

  return createAppTheme({ ...options, components });
}
