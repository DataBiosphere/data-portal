import { tabletUp } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import {
  TEXT_BODY_LARGE_500,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
  TEXT_HEADING_XLARGE,
} from "@databiosphere/findable-ui/lib/theme/common/typography";
import { ThemeOptions } from "@mui/material";

const FONT_FAMILY_DIN = "'din-2014', sans-serif";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: "#005EA9",
      main: "#1C7CC7",
    },
  },
  typography: {
    [TEXT_BODY_LARGE_500]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: 18,
      fontWeight: 400,
    },
    [TEXT_HEADING]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: 22,
      fontWeight: 400,
      letterSpacing: "normal",
      [tabletUp]: {
        fontSize: 26,
        letterSpacing: "normal",
      },
    },
    [TEXT_HEADING_LARGE]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: 26,
      fontWeight: 400, // TODO: Update to 600 when font is available, here and elsewhere.
      letterSpacing: "normal",
      lineHeight: "34px",
      [tabletUp]: {
        fontSize: 32,
        letterSpacing: "normal",
      },
    },
    [TEXT_HEADING_SMALL]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: 20,
      fontWeight: 400,
      letterSpacing: "normal",
      [tabletUp]: {
        fontSize: 22,
        letterSpacing: "normal",
      },
    },
    [TEXT_HEADING_XLARGE]: {
      fontFamily: FONT_FAMILY_DIN,
      fontSize: 32,
      fontWeight: 400,
      letterSpacing: "normal",
      [tabletUp]: {
        fontSize: 42,
        letterSpacing: "-0.4px",
      },
    },
  },
};
