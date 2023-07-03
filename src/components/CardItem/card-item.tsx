"use client";

import { Card, Typography, Select, Button, Row, Col } from "antd";
import { useState } from "react";
import { useAppDispatch } from "@hooks";
import { addCartItemAsync } from "@store/shoppingCart";
import { Spinner } from "@components";
import { CardProps } from "@shared/typification";

const { Meta } = Card;
const { Text } = Typography;

const CardItem = ({
  info: { id, name, photos, color, price, sizes, addingLoading },
}: CardProps) => {
  const dispatch = useAppDispatch();
  const [currentSize, setSize] = useState(sizes[0].name);

  const handleSizeChange = (value: string) => {
    setSize(value);
  };

  const handleClick = async () => {
    const sizeId = sizes.find((size) => size.name === currentSize)?.id;

    if (sizeId) {
      dispatch(addCartItemAsync({ id, sizeId }));
    }
  };

  return (
    <Card
      cover={
        <img
          alt={name}
          src={photos[0].middle}
          style={{ borderRadius: "3px 3px 0 0" }}
        />
      }
      style={{ borderRadius: 3 }}
    >
      <Spinner spinning={addingLoading}>
        <Meta title={name} style={{ marginBottom: 20 }} />

        <Row justify="space-between" align="middle">
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "15px", width: "100%" }}
          >
            <Col span={12} style={{ display: "flex", alignItems: "center" }}>
              <Text>Color:</Text>
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
            <Text>{price}</Text>
          </Col>

          <Col
            span={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button type="primary" onClick={handleClick}>
              В корзину
            </Button>
          </Col>
        </Row>
      </Spinner>
    </Card>
  );
};

export default CardItem;
