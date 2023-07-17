import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@helpers/createEmotionCache";
import theme from "@theme/index";

import Header from "@components/Header";
import DialogMessage from "@components/DialogMessage";
import { getStorage } from "@helpers/storage";
import { useEffect, useMemo } from "react";
import useSession from "@hooks/custom/useSession";
import { Provider } from "react-redux";
import { setupStore } from "@helpers/store";
import Layout from "@components/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  //   navigator.cookieEnabled ? (
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={setupStore()}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );

  //   : (
  //     <DialogMessage
  //       title="local.cookies_alert.cookies_disabled_warning_title"
  //       subtitle="local.cookies_alert.cookies_disabled_warning_subtitle"
  //       open={!getStorage()}
  //     />
  //   )
};

export default MyApp;
