import "@databiosphere/findable-ui";
import { AppLayout } from "@databiosphere/findable-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Floating } from "@databiosphere/findable-ui/lib/components/Layout/components/Floating/floating";
import { Header } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";
import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main";
import { ConfigProvider } from "@databiosphere/findable-ui/lib/providers/config";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { createBreakpoints } from "@mui/system";
import { deepmerge } from "@mui/utils";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { Head } from "../components/common/Head/head";
import { AppFooter } from "../components/Layout/components/Footer/footer.styles";
import { config } from "../config/config";
import { BREAKPOINTS } from "../site-config/common/constants";
import { SiteConfig } from "../site-config/common/entities";
import { mergeAppTheme } from "../theme/theme";
import { LayoutDimensionsProvider } from "@databiosphere/findable-ui/lib/providers/layoutDimensions/provider";
import { DataDictionaryStateProvider } from "@databiosphere/findable-ui/lib/providers/dataDictionaryState/provider";
import { ServicesProvider } from "@databiosphere/findable-ui/lib/providers/services/provider";

interface PageProps {
  pageTitle?: string;
}

export type NextPageWithComponent = NextPage & {
  Footer?: typeof AppFooter;
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
  pageProps: PageProps;
};

function MyApp({ Component, pageProps }: AppPropsWithComponent): JSX.Element {
  const Footer = Component.Footer || AppFooter;
  const Main = Component.Main || DXMain;
  const appConfig = config() as SiteConfig;
  const {
    analytics,
    appTitle,
    layout,
    themeOptions: baseThemeOptions,
  } = appConfig;
  const { floating, footer, header } = layout || {};
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const { pageTitle, themeOptions } = pageProps;
  const appTheme = mergeAppTheme(baseThemeOptions, themeOptions);

  // Initialize Google Tag Manager.
  useEffect(() => {
    if (gtmId) {
      TagManager.initialize({ auth: gtmAuth, gtmId, preview: gtmPreview });
    }
  }, [gtmAuth, gtmId, gtmPreview]);

  return (
    <EmotionThemeProvider theme={appTheme}>
      <ThemeProvider theme={appTheme}>
        <ConfigProvider config={appConfig}>
          <Head appTitle={appTitle} pageTitle={pageTitle} />
          <CssBaseline />
          <ServicesProvider>
            <DataDictionaryStateProvider>
              <LayoutDimensionsProvider>
                <AppLayout>
                  <ThemeProvider
                    theme={(theme: Theme): Theme => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- MUI internal property 'vars' is automatically added when cssVariables is enabled.
                      const { vars, ...themeWithoutVars } = theme;
                      return createTheme(
                        deepmerge(themeWithoutVars, {
                          breakpoints: createBreakpoints(BREAKPOINTS),
                        })
                      );
                    }}
                  >
                    <Header {...header} />
                  </ThemeProvider>
                  <Main>
                    <Component {...pageProps} />
                    <Floating {...floating} />
                  </Main>
                  <Footer {...footer} />
                </AppLayout>
              </LayoutDimensionsProvider>
            </DataDictionaryStateProvider>
          </ServicesProvider>
        </ConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
