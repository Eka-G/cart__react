"use client";
import { Row, Col } from "antd";
import { CardItem } from "@components";
import { CardGridProps } from "@shared/typification";

const CardGrid = ({ cards }: CardGridProps) => {
  const spanLg = cards.length < 4 ? 8 : 6;

  return (
    <Row
      justify="center"
      align="middle"
      gutter={[24, 32]}
      style={{ width: "100%" }}
    >
      {cards.map((card, i) => (
        <Col
          md={{
            span: 8,
          }}
          lg={{
            span: spanLg,
          }}
          key={`${card}-${i + 1}`}
        >
          <CardItem info={card} />
        </Col>
      ))}
    </Row>
  );
};

export default CardGrid;
