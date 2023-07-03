"use client";

import { useEffect } from "react";
import { Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks";
import { ShoppingCartGrid } from "@components";
import {
  getCartItemsAsync,
  selectCartItems,
  selectCartPrice,
  selectCartError,
} from "@store/shoppingCart";
import styles from "./style.module.scss";

const { Title } = Typography;

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartPrice = useAppSelector(selectCartPrice);
  const cartError = useAppSelector(selectCartError);

  useEffect(() => {
    dispatch(getCartItemsAsync());
  }, [dispatch]);

  return (
    <section className={styles.cart}>
      <Title level={1}>Корзина</Title>
      {cartError ? (
        <Title level={2} type="danger">
          {cartError}
        </Title>
      ) : (
        <ShoppingCartGrid items={cartItems} summaryPrice={cartPrice} />
      )}
    </section>
  );
}
