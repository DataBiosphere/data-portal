import { AppLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/AppLayout/appLayout.styles";
import { ContentLayout } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/contentLayout";
import { Footer } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Footer/footer";
import { Header } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Header/header";
import { Main } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Main/main.styles";
import { createAppTheme } from "@clevercanary/data-explorer-ui/lib/theme/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { config } from "../config/config";

function MyApp({ Component, pageProps }: AppProps) {
  const { layout, themeOptions } = config();
  const theme = createAppTheme(themeOptions);
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <Header {...layout.header} />
          <Main>
            <ContentLayout content={<Component {...pageProps} />} />
          </Main>
          <Footer {...layout.footer} />
        </AppLayout>
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}

export default MyApp;
