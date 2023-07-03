"use client";

import { useEffect } from "react";
import { Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks";
import { CardGrid, Spinner } from "@components";
import {
  getItemsAsync,
  selectItems,
  selectCatalogError,
  getCatalogLoading,
} from "@store/catalog";
import { getCartItemsAsync } from "@store/shoppingCart";

const { Title } = Typography;

export default function Home() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const errors = useAppSelector(selectCatalogError);
  const isLoading = useAppSelector(getCatalogLoading);

  useEffect(() => {
    //reason: response cookie SID just for lichi domain
    document.cookie = "SID=SID.16880472617984.7713926-1";

    dispatch(getItemsAsync());
    dispatch(getCartItemsAsync());
  }, [dispatch]);

  const content = errors ? (
    <Title level={2} type="danger">
      {errors}
    </Title>
  ) : (
    <CardGrid cards={items} />
  );

  return (
    <section>
      <Title level={1}>Добро пожаловать в каталог</Title>
      {isLoading ? (
        <Spinner spinning={isLoading}>
          <Title level={2}>Минутку...</Title>
        </Spinner>
      ) : (
        content
      )}
    </section>
  );
}
