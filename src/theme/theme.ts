import { Theme, ThemeOptions } from "@mui/material";
import { createTheme, Shadows } from "@mui/material/styles";
import { BREAKPOINT } from "../hooks/useBreakpointHelper";

/**
 * Custom breakpoints
 */
export const breakpointMobile = 0;
export const breakpointTablet = 768; // Tablet.
export const breakpointDesktop = 1440; // Desktop.

/**
 * Custom colors
 */
const customColors = {
  text: "#202124",
  white: "#FFFFFF",
};

/**
 * Custom shadows
 */
const customShadows = [
  "none",
  "0 1px 4px 0 #00000012",
  "0 8px 8px -4px #10182808, 0 20px 24px -4px #10182814",
];

/**
 * Returns a generated theme with site customization.
 * @param customTheme - Custom theme option overrides.
 * @returns app theme with any custom theme overrides specified by the site config.
 */
export const getAppTheme = (customTheme?: ThemeOptions): Theme => {
  /**
   * Custom config theme
   */
  const customTypography = customTheme?.typography || {};
  const customPalette = customTheme?.palette || {};

  /**
   * Default theme
   */
  const defaultTheme = createTheme(
    {
      breakpoints: {
        values: {
          [BREAKPOINT.DESKTOP]: breakpointDesktop,
          [BREAKPOINT.MOBILE]: breakpointMobile,
          [BREAKPOINT.TABLET]: breakpointTablet,
        },
      },
      palette: {
        alert: {
          light: "#FED3D1",
          lightest: "#FFF4F4",
          main: "#B42318",
        },
        background: {
          default: customColors.white,
        },
        info: {
          contrastText: "#00729C",
          light: "#97D6EA",
          lightest: "#F2FAFC",
          main: "#00729C",
        },
        ink: {
          light: "#637381",
          main: "#212B36",
        },
        smoke: {
          dark: "#C4CDD5",
          light: "#F6F6F7",
          lightest: "#FAFBFB",
          main: "#E1E3E5",
        },
        success: {
          light: "#AEE9D1",
          lightest: "#F1F8F5",
          main: "#287555",
        },
        warning: {
          contrastText: "#B54708",
          light: "#FFD79D",
          lightest: "#FFFAEB",
          main: "#B54708",
        },
      },
      spacing: 4,
      typography: {
        "text-body-400": {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
        },
        "text-body-400-2lines": {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "24px",
        },
        "text-body-500": {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "20px",
        },
        "text-body-500-2lines": {
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
        "text-body-large-400": {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: "24px",
        },
        "text-body-large-400-2lines": {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: "28px",
        },
        "text-body-large-500": {
          fontFamily: "Inter",
          fontSize: 16,
          fontWeight: 500,
          lineHeight: "24px",
        },
        "text-body-small-400": {
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: 400,
          lineHeight: "16px",
        },
        "text-body-small-500": {
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: 500,
          lineHeight: "16px",
        },
        "text-heading": {
          fontFamily: "Inter",
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "-0.2px",
          lineHeight: "28px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 24,
            letterSpacing: "-0.4px",
            lineHeight: "32px",
          },
        },
        "text-heading-large": {
          fontFamily: "Inter",
          fontSize: 24,
          fontWeight: 500,
          letterSpacing: "-0.4px",
          lineHeight: "32px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 30,
            letterSpacing: "-0.8px",
            lineHeight: "40px",
          },
        },
        "text-heading-small": {
          fontFamily: "Inter",
          fontSize: 18,
          fontWeight: 500,
          lineHeight: "26px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 20,
            letterSpacing: "-0.2px",
            lineHeight: "28px",
          },
        },
        "text-heading-xlarge": {
          fontFamily: "Inter",
          fontSize: 30,
          fontWeight: 500,
          letterSpacing: "-0.8px",
          lineHeight: "40px",
          [`@media (min-width: ${breakpointTablet}px)`]: {
            fontSize: 40,
            letterSpacing: "-1.4px",
            lineHeight: "56px",
          },
        },
        "text-uppercase-500": {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: 500,
          lineHeight: "16px",
          textTransform: "uppercase",
        },
      },
    },
    { palette: customPalette, typography: customTypography }
  );

  /**
   * Default theme overrides
   */
  defaultTheme.palette.text.primary = customColors.text;
  defaultTheme.shadows = [...defaultTheme.shadows].map(
    (shadow, s) => customShadows[s] || shadow
  ) as Shadows;

  /**
   * Breakpoint constants
   */
  const breakpointUpDesktop = defaultTheme.breakpoints.up(BREAKPOINT.DESKTOP);
  const breakpointUpMobile = defaultTheme.breakpoints.up(BREAKPOINT.MOBILE);
  const breakpointUpTablet = defaultTheme.breakpoints.up(BREAKPOINT.TABLET);

  /**
   * Color constants
   */
  const infoLight = defaultTheme.palette.info.light;
  const ink = defaultTheme.palette.ink.main;
  const inkLight = defaultTheme.palette.ink.light;
  const smoke = defaultTheme.palette.smoke.main;
  const smokeDark = defaultTheme.palette.smoke.dark;
  const smokeLight = defaultTheme.palette.smoke.light;
  const warningLight = defaultTheme.palette.warning.light;
  const { white } = defaultTheme.palette.common;

  /**
   * Color alpha constants
   */
  const alpha04 = "0a";
  const alpha80 = "cc";

  /**
   * Blacks
   */
  const black = "#000000";
  const black04 = `${black}${alpha04}`;

  /*
   * Elevation constants
   */
  const elevation01 = defaultTheme.shadows[1];
  const elevation02 = defaultTheme.shadows[2];

  /**
   * Stroke constants
   */
  const strokeBottom = "inset 0 -1px 0 0";
  const strokeBottomSmoke = `${strokeBottom} ${smoke}`;
  const strokeTop = "inset 0 1px 0 0";
  const strokeTopSmoke = `${strokeTop} ${smoke}`;

  /**
   * Typography constants
   */
  const textBody400 = defaultTheme.typography["text-body-400"];
  const textBody500 = defaultTheme.typography["text-body-500"];
  const textBodySmall400 = defaultTheme.typography["text-body-small-400"];
  const textBodySmall500 = defaultTheme.typography["text-body-small-500"];

  /**
   * App theme
   */
  return createTheme(defaultTheme, {
    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
          position: "static",
        },
        styleOverrides: {
          colorDefault: {
            backgroundColor: white,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          invisible: {
            backgroundColor: "transparent",
          },
          root: {
            backgroundColor: `${ink}${alpha80}`,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
        styleOverrides: {
          endIcon: {
            margin: 0,
          },
          root: {
            ...textBody500,
            gap: 4,
            padding: "10px 16px",
            textTransform: "capitalize",
          },
          startIcon: {
            marginRight: 0,
          },
        },
        variants: [
          {
            props: {
              variant: "nav",
            },
            style: {
              ...textBody500,
              color: ink,
              minWidth: 0,
              padding: "12px 24px",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: smokeLight,
              },
              [breakpointUpDesktop]: {
                padding: "6px 12px",
              },
            },
          },
        ],
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
        styleOverrides: {
          root: {
            fontFamily: defaultTheme.typography.fontFamily,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
            fontWeight: 400,
            letterSpacing: "0.2px",
            lineHeight: "18px", // 18px
          },
          html: {
            fontSize: "15px", // 15px
          },
          img: {
            display: "block",
            margin: 0,
          },
          strong: {
            fontWeight: 500,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paperWidthFalse: {
            margin: 0,
            maxWidth: "100%",
            width: "100%",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: smoke,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            overflowY: "visible", // required; allows backdrop button to render outside of drawer container
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
          sizeLarge: {
            padding: 10,
          },
          sizeSmall: {
            padding: 6,
          },
        },
        variants: [
          {
            props: {
              color: "ink",
            },
            style: {
              color: ink,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: smokeLight,
              },
            },
          },
          {
            props: {
              color: "inkLight",
            },
            style: {
              color: inkLight,
              // eslint-disable-next-line sort-keys -- disabling key order for readability
              "&:hover": {
                backgroundColor: smokeLight,
              },
            },
          },
          {
            props: {
              edge: "end",
              size: "small",
            },
            style: {
              marginRight: -6,
            },
          },
          {
            props: {
              size: "xlarge",
            },
            style: {
              padding: 14,
            },
          },
          {
            props: {
              size: "xsmall",
            },
            style: {
              padding: 2,
            },
          },
          {
            props: {
              edge: "end",
              size: "xsmall",
            },
            style: {
              marginRight: -2,
            },
          },
          {
            props: {
              size: "xxsmall",
            },
            style: {
              padding: 0,
            },
          },
        ],
      },
      MuiInput: {
        styleOverrides: {
          input: {
            color: inkLight,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:focus": {
              color: ink,
            },
          },
          root: {
            "&& ::placeholder": {
              opacity: 1,
            },
            "&&.Mui-focused ::placeholder": {
              opacity: 0,
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          adornedStart: {
            gap: 8,
          },
          root: {
            ...textBody400,
            height: 40,
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
      MuiMenuItem: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          root: {
            ...textBody400,
            minHeight: "unset",
            padding: "10px 16px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            color: inkLight,
            height: 20,
            padding: "10px 14px 10px 0",
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "&:focus": {
              color: ink,
            },
          },
          notchedOutline: {
            borderColor: smokeDark,
          },
          root: {
            backgroundColor: white,
            boxShadow: `inset 0 2px 0 0 ${black04}`,
            paddingLeft: 12,
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            "& .MuiSvgIcon-root": {
              color: inkLight, // Adornment e.g. "SearchIcon".
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: smokeDark,
              },
            },
            // eslint-disable-next-line sort-keys -- disabling key order for specificity
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: ink,
                borderWidth: 1,
              },
              "& .MuiSvgIcon-root": {
                color: ink, // Adornment e.g. "SearchIcon".
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          footer: {
            backgroundColor: smokeLight,
            boxShadow: `${strokeTopSmoke}, ${strokeBottomSmoke}`,
          },
          menu: {
            borderColor: smokeDark,
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 1,
            boxShadow: elevation02,
          },
          panel: {
            borderColor: smoke,
            borderStyle: "solid",
            borderWidth: 1,
            boxShadow: elevation01,
          },
          searchbar: {
            alignSelf: "flex-start",
            borderColor: smoke,
            borderRadius: 0,
            borderStyle: "solid",
            borderWidth: "0 0 1px 0",
            boxShadow: elevation01,
          },
          sidebar: {
            backgroundColor: smokeLight,
            padding: "24px 0",
            width: 312,
          },
        },
        variants: [
          {
            props: { variant: "footer" },
          },
          {
            props: { variant: "menu" },
          },
          {
            props: { variant: "panel" },
          },
          {
            props: { variant: "searchbar" },
          },
          {
            props: { variant: "sidebar" },
          },
        ],
      },
      MuiSvgIcon: {
        styleOverrides: {
          fontSizeLarge: {
            fontSize: "32px",
          },
          fontSizeSmall: {
            fontSize: "20px",
          },
          fontSizeXsmall: {
            fontSize: "18px",
          },
          fontSizeXxlarge: {
            fontSize: "40px",
          },
          fontSizeXxsmall: {
            fontSize: "16px",
          },
        },
        variants: [
          {
            props: {
              size: "xsmall",
            },
          },
          {
            props: {
              size: "xxlarge",
            },
          },
          {
            props: {
              size: "xxsmall",
            },
          },
        ],
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            [breakpointUpMobile]: {
              paddingLeft: 12,
              paddingRight: 12,
            },
            // eslint-disable-next-line sort-keys -- disabling key order for readability
            [breakpointUpDesktop]: {
              paddingLeft: 16,
              paddingRight: 16,
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variant: "inherit",
        },
        styleOverrides: {
          gutterBottom: {
            marginBottom: 8,
          },
        },
      },
    },
  });
};
