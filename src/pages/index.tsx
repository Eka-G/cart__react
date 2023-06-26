"use client";

import { useEffect } from "react";
import { Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks";
import { CardGrid } from "@components";
import { getItemsAsync, selectItems } from "@store/catalog-slice";

const { Title } = Typography;

export default function Home() {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemsAsync());
  }, [dispatch]);

  return (
    <section>
      <Title level={1}>Добро пожаловать в каталог</Title>
      <CardGrid cards={items} />
    </section>
  );
}
