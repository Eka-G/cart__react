"use client";

import { Card, Typography, Select, Button, Row, Col } from "antd";
import { useState } from "react";
import { CardProps } from "@shared/typification";

const { Meta } = Card;
const { Text } = Typography;

const CardItem = ({
  info: { id, name, photos, color, price, sizes },
}: CardProps) => {
  const [currentSize, setSize] = useState(sizes[0].name);

  const handleSizeChange = (value: string) => {
    setSize(value);
  };

  return (
    <Card
      // loading
      cover={
        <img
          alt={name}
          src={photos[0].middle}
          style={{ borderRadius: "3px 3px 0 0" }}
        />
      }
      style={{ borderRadius: 3 }}
    >
      <Meta title={name} style={{ marginBottom: 20 }} />

      <Row justify="space-between" align="middle">
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "15px", width: "100%" }}
        >
          <Col span={12} style={{ display: "flex", alignItems: "center" }}>
            <Text style={{ fontSize: "12px" }}>Color:</Text>
            <div
              style={{
                marginLeft: 5,
                height: 20,
                width: 20,
                border: "1px solid #efe2ff",
                borderRadius: "50%",
                backgroundColor: color.value,
              }}
            />
          </Col>

          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Select
              defaultValue="XS"
              style={{ width: 60 }}
              onChange={handleSizeChange}
              options={sizes.map((size) => ({
                value: size.name,
                label: size.name,
              }))}
            />
          </Col>
        </Row>

        <Col span={12}>
          <Text style={{ fontSize: "12px" }}>{price}</Text>
        </Col>

        <Col span={12} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary">В корзину</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CardItem;
