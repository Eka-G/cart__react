"use client";

import { ConfigProvider, Layout } from "antd";
import { Header, Footer } from "@components";
import { Lora } from "next/font/google";
import styles from "./style.module.scss";

const lora = Lora({
  weight: "400",
  subsets: ["latin"],
});

const { Content } = Layout;

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: lora.style.fontFamily,
          fontSize: 12,
          colorTextBase: "#6e6e6e",
          colorPrimary: "#c99eff",
        },
        components: {
          Typography: {
            fontSizeHeading1: 22,
            fontSizeHeading2: 20,
            fontSizeHeading3: 18,
            fontSizeHeading4: 16,
            fontSizeHeading5: 16,
            titleMarginBottom: 50,
            borderRadiusOuter: 0,
          },
        },
      }}
    >
      <Layout className={styles.layout}>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
