"use client";

import { Button, Col, Row, Typography } from "antd";
import { ShoppingCartItem } from "@components";
import { ShoppingCartGridProps } from "@shared/typification";

const { Text } = Typography;

const ShoppingCartGrid = ({ items }: ShoppingCartGridProps) => {
  const amount = items.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/[^0-9\.]/g, ""), 10),
    0
  );

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 16]}
      style={{ width: "100%" }}
    >
      {items.map((item) => (
        <Col span={24} key={item.id}>
          <ShoppingCartItem info={item} />
        </Col>
      ))}

      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Text>
          К оплате: {amount} {items[0].postfix_symbol}
        </Text>
      </Col>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="primary">ЗАКАЗАТЬ</Button>
      </Col>
    </Row>
  );
};

export default ShoppingCartGrid;
