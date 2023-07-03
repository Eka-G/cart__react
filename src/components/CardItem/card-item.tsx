"use client";

import { Card, Typography, Select, Button, Row, Col } from "antd";
import { useState } from "react";
import { useAppDispatch } from "@hooks";
import { addCartItemAsync } from "@store/shoppingCart";
import { Spinner } from "@components";
import { CardProps } from "@shared/typification";
import styles from "./style.module.scss";

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
        <img alt={name} src={photos[0].middle} className={styles.card__img} />
      }
      className={styles.card}
    >
      <Spinner spinning={addingLoading}>
        <Meta title={name} style={{ marginBottom: 20 }} />

        <Row justify="space-between" align="middle">
          <Row
            justify="space-between"
            align="middle"
            className={styles.card__row}
          >
            <Col span={12} className={styles.card__centered_columns}>
              <Text>Color:</Text>
              <div
                className={styles.card__color_sample}
                style={{ backgroundColor: color.value }}
              />
            </Col>

            <Col span={12} className={styles.card__columns}>
              <Select
                defaultValue="XS"
                className={styles.card__select}
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

          <Col span={12} className={styles.card__columns}>
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
