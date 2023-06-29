"use client";

import { Button, Col, Row, Typography } from "antd";
import { ShoppingCartItem } from "@components";
import { ShoppingCartGridProps } from "@shared/typification";

const { Text } = Typography;

const ShoppingCartGrid = ({ items, summaryPrice }: ShoppingCartGridProps) => {
  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 16]}
      style={{ width: "100%" }}
    >
      {items.map((item) => (
        <Col span={24} key={`${item.id}-${item.count}`}>
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
          К оплате: {summaryPrice} {items[0]?.postfix_symbol}
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
