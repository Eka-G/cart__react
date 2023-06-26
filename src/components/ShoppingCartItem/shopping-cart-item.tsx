"use client";

import { useState } from "react";
import { Col, Image, InputNumber, Row, Select, Typography } from "antd";
import { ShoppingCartItemProps } from "@shared/typification";

const { Text } = Typography;

const ShoppingCartItem = ({
  info: { name, photo, price, size, sizes, color, count, available },
}: ShoppingCartItemProps) => {
  const [currentSize, setSize] = useState(size);
  const [currentAmount, setAmount] = useState(count);

  const handleSizeChange = (value: string) => {
    setSize(value);
    setAmount(1);
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
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
      >
        <Text>{price}</Text>
      </Col>
    </Row>
  );
};

export default ShoppingCartItem;
