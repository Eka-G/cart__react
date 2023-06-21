"use client";

import Link from "next/link";
import Image from "next/image";
import { Layout } from "antd";
import styles from "./style.module.scss";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className={styles.header}>
      <Link href="/">
        <Image src="./logo.svg" width="150" height="50" alt="Purity" />
      </Link>
      <Link href="/cart" className={styles.header__cart}>
        <Image src="./shopping-bag.svg" width="25" height="25" alt="Cart" />
      </Link>
    </Header>
  );
};

export default HeaderComponent;
