"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Col, Row, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getCartLoading, removeCartItemsAsync } from "@store/shoppingCart";
import { ShoppingCartItem, Spinner, SuccessModal } from "@components";
import { ShoppingCartGridProps } from "@shared/typification";
import styles from "./style.module.scss";

const { Text } = Typography;

const ShoppingCartGrid = ({ items, summaryPrice }: ShoppingCartGridProps) => {
  const dispatch = useAppDispatch();
  const cartLoading = useAppSelector(getCartLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsColumns = items.map((item) => (
    <Col span={24} key={`${item.id}-${item.count}`}>
      <ShoppingCartItem info={item} />
    </Col>
  ));
  const itemsIds = items.map((item) => item.id);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 16]}
      className={styles.cart_grid}
    >
      <Spinner spinning={cartLoading}>
        {itemsColumns}

        {summaryPrice ? (
          <>
            <Col span={24} className={styles.cart_grid__columns}>
              <Text className={styles.cart_grid__text}>
                К оплате: {summaryPrice} {items[0]?.postfix_symbol}
              </Text>
            </Col>
            <Col span={24} className={styles.cart_grid__columns}>
              <Button type="primary" onClick={toggleModal}>
                ЗАКАЗАТЬ
              </Button>
            </Col>
            <SuccessModal isModalOpen={isModalOpen} handleOk={toggleModal} />
          </>
        ) : (
          <Text>
            Ваша корзина пока пуста...
            <br />
            <Link href="/">Взгляните на товары из нашего каталога</Link>
          </Text>
        )}
      </Spinner>
    </Row>
  );
};

export default ShoppingCartGrid;
