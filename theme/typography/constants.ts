import { tabletUp } from "@databiosphere/findable-ui/lib/theme/common/breakpoints";
import { CSSProperties } from "@mui/material";
import { TYPOGRAPHY_VARIANT } from "./types";

const FONT_FAMILY_DIN = "'din-2014', sans-serif";

const textBodyLarge500: CSSProperties = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "18px",
  fontWeight: 400,
};

const textHeading: CSSProperties = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "22px",
  fontWeight: 400,
  letterSpacing: "normal",
  [tabletUp]: {
    fontSize: "24px",
    letterSpacing: "normal",
  },
};

const textHeadingLarge: CSSProperties = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "26px",
  fontWeight: 400, // TODO: Update to 600 when font is available, here and elsewhere.
  letterSpacing: "normal",
  lineHeight: "34px",
  [tabletUp]: {
    fontSize: "32px",
    letterSpacing: "normal",
  },
};

const textHeadingSmall: CSSProperties = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "20px",
  fontWeight: 400,
  letterSpacing: "normal",
  [tabletUp]: {
    fontSize: "22px",
    letterSpacing: "normal",
  },
};

const textHeadingXLarge: CSSProperties = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "32px",
  fontWeight: 400,
  letterSpacing: "normal",
  [tabletUp]: {
    fontSize: "42px",
    letterSpacing: "-0.4px",
  },
};

const textHeadingXSmall: CSSProperties = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "18px",
  fontWeight: 400, // TODO: Update to 600 when font is available, here and elsewhere.
  letterSpacing: "normal",
  lineHeight: "26px",
};

export const TYPOGRAPHY: Record<TYPOGRAPHY_VARIANT, CSSProperties> = {
  [TYPOGRAPHY_VARIANT.TEXT_BODY_LARGE_500]: textBodyLarge500,
  [TYPOGRAPHY_VARIANT.TEXT_HEADING]: textHeading,
  [TYPOGRAPHY_VARIANT.TEXT_HEADING_LARGE]: textHeadingLarge,
  [TYPOGRAPHY_VARIANT.TEXT_HEADING_SMALL]: textHeadingSmall,
  [TYPOGRAPHY_VARIANT.TEXT_HEADING_XSMALL]: textHeadingXSmall,
  [TYPOGRAPHY_VARIANT.TEXT_HEADING_XLARGE]: textHeadingXLarge,
};
