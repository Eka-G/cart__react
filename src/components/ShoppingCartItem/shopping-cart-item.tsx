"use client";

import { useState } from "react";
import { Button, Col, Image, InputNumber, Row, Select, Typography } from "antd";
import { useAppDispatch } from "@hooks";
import { ShoppingCartItemProps } from "@shared/typification";
import {
  addCartItemAsync,
  removeCartItemsAsync,
} from "@store/shopping-cart-slice";

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
      ? dispatch(addCartItemAsync(id))
      : dispatch(removeCartItemsAsync({ id }));
  };

  const haldleDetete = () => {
    const isAll = currentAmount === 1;
    dispatch(removeCartItemsAsync({ id, isAll }));
  };

  return (
    <Row
      justify="space-between"
      gutter={[24, 16]}
      style={{
        padding: "20px 0",
        borderBottom: "1px solid #afb0b3",
      }}
    >
      <Col xs={{ order: 1 }} sm={{ order: 0 }}>
        <Image src={photo} width={150} height={200} alt={name} />
      </Col>
      <Col
        xs={{
          span: 24,
          order: 0,
        }}
        sm={{
          span: 7,
          order: 1,
        }}
      >
        <Text>{name}</Text>
        {!available && <Text type="danger">Извините, товар недоступен</Text>}
      </Col>
      <Col xs={{ order: 2 }}>
        <Select
          value={currentSize}
          style={{ marginBottom: 20, width: 70 }}
          onChange={handleSizeChange}
          options={Object.keys(sizes).map((size) => ({
            value: size,
            label: sizes[size].name,
          }))}
          disabled={!available}
        />

        <InputNumber
          controls
          value={currentAmount}
          style={{ display: "block", width: 70 }}
          min={1}
          max={sizes[currentSize].amount}
          onStep={handleAmountChange}
          disabled={!available}
        />
        <div
          style={{
            margin: "20px 0",
            height: 20,
            width: 20,
            border: "1px solid #efe2ff",
            borderRadius: "50%",
            backgroundColor: color.value,
          }}
        />
      </Col>
      <Col
        xs={{
          order: 3,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 10 }}>{price}</Text>
        <Button onClick={haldleDetete}>Удалить</Button>
      </Col>
    </Row>
  );
};

export default ShoppingCartItem;
