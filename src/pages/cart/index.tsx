"use client";

import { useEffect } from "react";
import { Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks";
import { ShoppingCartGrid } from "@components";
import {
  getCartItemsAsync,
  selectCartItems,
  selectCartPrice,
} from "@store/shopping-cart-slice";

const { Title } = Typography;

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartPrice = useAppSelector(selectCartPrice);

  useEffect(() => {
    dispatch(getCartItemsAsync());
  }, [dispatch]);

  return (
    <section style={{ maxWidth: 800 }}>
      <Title level={1}>Корзина</Title>
      <ShoppingCartGrid items={cartItems} summaryPrice={cartPrice} />
    </section>
  );
}
