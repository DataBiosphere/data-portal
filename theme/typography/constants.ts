import { TypographyStyle } from "@mui/material";

const FONT_FAMILY_DIN = "'din-2014', sans-serif";

const textBodyLarge500: TypographyStyle = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "18px",
  fontWeight: 400,
};

const textHeading: TypographyStyle = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "22px",
  fontWeight: 400,
  letterSpacing: "normal",
  "@media (min-width: 768px)": {
    fontSize: "24px",
    letterSpacing: "normal",
  },
};

const textHeadingLarge: TypographyStyle = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "26px",
  fontWeight: 400, // TODO: Update to 600 when font is available, here and elsewhere.
  letterSpacing: "normal",
  lineHeight: "34px",
  "@media (min-width: 768px)": {
    fontSize: "32px",
    letterSpacing: "normal",
  },
};

const textHeadingSmall: TypographyStyle = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "20px",
  fontWeight: 400,
  letterSpacing: "normal",
  "@media (min-width: 768px)": {
    fontSize: "22px",
    letterSpacing: "normal",
  },
};

const textHeadingXLarge: TypographyStyle = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "32px",
  fontWeight: 400,
  letterSpacing: "normal",
  "@media (min-width: 768px)": {
    fontSize: "42px",
    letterSpacing: "-0.4px",
  },
};

const textHeadingXSmall: TypographyStyle = {
  fontFamily: FONT_FAMILY_DIN,
  fontSize: "18px",
  fontWeight: 400, // TODO: Update to 600 when font is available, here and elsewhere.
  letterSpacing: "normal",
  lineHeight: "26px",
};

export const TYPOGRAPHY: Record<string, TypographyStyle> = {
  "body-large-500": textBodyLarge500,
  heading: textHeading,
  "heading-large": textHeadingLarge,
  "heading-small": textHeadingSmall,
  "heading-xsmall": textHeadingXSmall,
  "heading-xlarge": textHeadingXLarge,
};
