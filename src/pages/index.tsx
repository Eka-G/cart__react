"use client";

import { useEffect } from "react";
import { Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks";
import { CardGrid, Spinner } from "@components";
import {
  getItemsAsync,
  selectItems,
  getCatalogLoading,
} from "@store/catalog-slice";

const { Title } = Typography;

export default function Home() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(getCatalogLoading);

  useEffect(() => {
    dispatch(getItemsAsync());
  }, [dispatch]);

  return (
    <section>
      <Title level={1}>Добро пожаловать в каталог</Title>
      {isLoading ? (
        <Spinner spinning={isLoading}>
          <Title level={2}>Минутку...</Title>
        </Spinner>
      ) : (
        <CardGrid cards={items} />
      )}
    </section>
  );
}
