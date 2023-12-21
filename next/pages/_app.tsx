import "@clevercanary/data-explorer-ui";
import { AppLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Floating } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Floating/floating";
import { Header } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { Main as DXMain } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main";
import { LayoutStateProvider } from "@clevercanary/data-explorer-ui/lib/providers/layoutState";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
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
import { mergeAppTheme } from "../theme/theme";

export type NextPageWithComponent = NextPage & {
  Footer?: typeof AppFooter;
  Main?: typeof DXMain;
};

export type AppPropsWithComponent = AppProps & {
  Component: NextPageWithComponent;
};

function MyApp({ Component, pageProps }: AppPropsWithComponent): JSX.Element {
  const Footer = Component.Footer || AppFooter;
  const Main = Component.Main || DXMain;
  const appConfig = config();
  const { analytics, layout, themeOptions } = appConfig;
  const { floating, footer, header } = layout || {};
  const { gtmAuth, gtmId, gtmPreview } = analytics || {};
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
          <Head />
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
