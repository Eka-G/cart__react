"use client";

import Link from "next/link";
import Image from "next/image";
import { Layout, Typography } from "antd";
import { useAppSelector } from "@hooks";
import { selectCartAmount } from "@store/shopping-cart-slice";
import styles from "./style.module.scss";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = () => {
  const cartAmount = useAppSelector(selectCartAmount);
  const isCartEmpty = cartAmount > 0;

  return (
    <Header className={styles.header}>
      <Link href="/">
        <Image src="./logo.svg" width="150" height="50" alt="Purity" />
      </Link>
      <Link href="/cart" className={styles.header__cart}>
        <Image src="./shopping-bag.svg" width="25" height="25" alt="Cart" />
        {isCartEmpty && (
          <div className={styles.header__cart_count}>
            <Text>{cartAmount}</Text>
          </div>
        )}
      </Link>
    </Header>
  );
};

export default HeaderComponent;
