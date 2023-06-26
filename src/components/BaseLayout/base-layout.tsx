"use client";

import { ConfigProvider, Layout } from "antd";
import { Header, Footer } from "@components";
import { Lora } from "next/font/google";

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
          fontSize: 14,
          colorTextBase: "#6e6e6e",
          colorPrimary: "#c99eff",
        },
        components: {
          Typography: {
            fontSizeHeading1: 24,
            fontSizeHeading2: 22,
            fontSizeHeading3: 20,
            fontSizeHeading4: 18,
            fontSizeHeading5: 16,
            titleMarginBottom: 50,
            borderRadiusOuter: 0,
          },
        },
      }}
    >
      <Layout
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
