import "@clevercanary/data-explorer-ui";
import { AppLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { Footer } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Footer/footer";
import { Header } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { Main } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main.styles";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { config } from "../config/config";
import { mergeAppTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { layout, themeOptions } = config();
  const defaultTheme = createAppTheme(themeOptions);
  const appTheme = mergeAppTheme(defaultTheme);
  return (
    <EmotionThemeProvider theme={appTheme}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <AppLayout>
          <Header {...layout.header} />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer {...layout.footer} />
        </AppLayout>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
