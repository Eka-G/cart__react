"use client";

import styles from "@styles/page.module.scss";
import { Typography } from "antd";

const { Title } = Typography;

export default function Home() {
  return (
    <section>
      <Title level={1}>Добро пожаловать в каталог</Title>
    </section>
  );
}
