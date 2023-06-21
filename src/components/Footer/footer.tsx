"use client";

import { Layout } from "antd";
import styles from "./style.module.scss";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer className={styles.footer}>
      <p>© 2023 PURITY</p>
    </Footer>
  );
};

export default FooterComponent;
