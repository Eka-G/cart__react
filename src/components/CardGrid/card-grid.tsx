"use client";
import { Row, Col } from "antd";
import { CardItem } from "@components";
import { CardGridProps } from "@shared/typification";
import styles from "./style.module.scss";

const CardGrid = ({ cards }: CardGridProps) => {
  const spanLg = cards.length < 4 ? 8 : 6;

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[24, 32]}
      className={styles.card_grid}
    >
      {cards.map((card) => (
        <Col key={card.id} md={{ span: 8 }} lg={{ span: spanLg }}>
          <CardItem info={card} />
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
