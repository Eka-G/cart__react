import React, { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import Head from "next/head";
import "antd/dist/reset.css";
import { BaseLayout } from "@components";
import wrappedStore from "@store/store";
import "@styles/globals.scss";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrappedStore.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Head>
        <title>Purity</title>
        <meta name="description" content="Купить эстетичную одежду онлайн." />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>

      <BaseLayout>
        <Component {...props.pageProps} />
      </BaseLayout>
    </Provider>
  );
};

export default MyApp;
