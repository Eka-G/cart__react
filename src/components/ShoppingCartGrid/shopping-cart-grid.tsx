"use client";

import Link from "next/link";
import { Button, Col, Row, Typography } from "antd";
import { useAppSelector } from "@hooks";
import { getCartLoading } from "@store/shoppingCart";
import { ShoppingCartItem, Spinner } from "@components";
import { ShoppingCartGridProps } from "@shared/typification";

const { Text } = Typography;

const ShoppingCartGrid = ({ items, summaryPrice }: ShoppingCartGridProps) => {
  const cartLoading = useAppSelector(getCartLoading);
  const itemsColumns = items.map((item) => (
    <Col span={24} key={`${item.id}-${item.count}`}>
      <ShoppingCartItem info={item} />
    </Col>
  ));

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[0, 16]}
      style={{ width: "100%" }}
    >
      <Spinner spinning={cartLoading}>
        {itemsColumns}

        {summaryPrice ? (
          <>
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
