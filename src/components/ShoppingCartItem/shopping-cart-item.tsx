"use client";

import { useState } from "react";
import { Button, Col, Image, InputNumber, Row, Select, Typography } from "antd";
import { useAppDispatch } from "@hooks";
import { ShoppingCartItemProps } from "@shared/typification";
import { addCartItemAsync, removeCartItemsAsync } from "@store/shoppingCart";
import styles from "./style.module.scss";

const { Text } = Typography;

const ShoppingCartItem = ({
  info: { id, name, photo, price, size, sizes, color, count, available },
}: ShoppingCartItemProps) => {
  const dispatch = useAppDispatch();
  const [currentSize, setSize] = useState(size);
  const [currentAmount, setAmount] = useState(count);

  const handleSizeChange = (value: string) => {
    setSize(value);
    setAmount(1);
  };

  const handleAmountChange = (value: number, info: { type: "up" | "down" }) => {
    info.type === "up"
      ? dispatch(addCartItemAsync({ sizeId: id }))
      : dispatch(removeCartItemsAsync({ id }));
  };

  const haldleDetete = () =>
    dispatch(removeCartItemsAsync({ id, isAll: true }));

  return (
    <Row justify="space-between" className={styles.cart_item}>
      <Col xs={{ order: 1 }} sm={{ order: 0 }}>
        <Image src={photo} width={150} height={200} alt={name} />
      </Col>
      <Col
        xs={{
          span: 24,
          order: 0,
        }}
        sm={{
          span: 6,
          order: 1,
        }}
      >
        <Text className={styles.cart_item__text}>{name}</Text>
        {!available && <Text type="danger">Извините, товар недоступен</Text>}
      </Col>
      <Col xs={{ order: 2 }} className={styles.cart_item__centered_columns}>
        <Text className={styles.cart_item__text}>Размер: {size}</Text>
        <InputNumber
          controls
          value={currentAmount}
          className={styles.cart_item__amount}
          min={1}
          max={sizes[currentSize].amount}
          onStep={handleAmountChange}
          disabled={!available}
        />
        <div
          className={styles.cart_item__color_sample}
          style={{ backgroundColor: color.value }}
        />
      </Col>
      <Col
        xs={{
          order: 3,
        }}
        className={styles.cart_item__centered_columns}
      >
        <Text className={styles.cart_item__text}>{price}</Text>
        <Button onClick={haldleDetete}>Удалить</Button>
      </Col>
    </Row>
  );
};

export default ShoppingCartItem;
