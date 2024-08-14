import "@databiosphere/findable-ui";
import { AppLayout } from "@databiosphere/findable-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Floating } from "@databiosphere/findable-ui/lib/components/Layout/components/Floating/floating";
import { Header } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/header";
import { Main as DXMain } from "@databiosphere/findable-ui/lib/components/Layout/components/Main/main";
import { LayoutStateProvider } from "@databiosphere/findable-ui/lib/providers/layoutState";
import { createAppTheme } from "@databiosphere/findable-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { Head } from "../components/common/Head/head";
import { AppFooter } from "../components/Layout/components/Footer/footer.styles";
import { config } from "../config/config";
import { ConfigProvider } from "../providers/config";
import { SiteConfig } from "../site-config/common/entities";
import { mergeAppTheme } from "../theme/theme";

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
  const { analytics, appTitle, layout, themeOptions } = appConfig;
  const { floating, footer, header } = layout || {};
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
  const { pageTitle } = pageProps;
  const defaultTheme = createAppTheme(themeOptions);
  const appTheme = mergeAppTheme(defaultTheme);

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
          <LayoutStateProvider>
            <AppLayout>
              <Header {...header} />
              <Main>
                <Component {...pageProps} />
                <Floating {...floating} />
              </Main>
              <Footer {...footer} />
            </AppLayout>
          </LayoutStateProvider>
        </ConfigProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
