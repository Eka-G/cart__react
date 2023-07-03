import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "@api/index";
import { type ShoppingCartItem } from "@shared/typification";
import {
  ShoppingCartResponce,
  ShoppingCartItemData,
} from "@api/types/shopping-cart-types";
import { startAddingLoading, stopAddingLoading } from "@store/catalog";
import { increaseAmount } from "./shopping-cart-slice";

export interface AddingProps {
  id?: number;
  sizeId: number;
}

export const getCartItemsAsync = createAsyncThunk(
  "cart/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ShoppingCartResponce, any> =
        await axios.post("/api/cart/list", {
          lang: 1,
          shop: 1,
        });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      const aData = await response.data.api_data.aData;
      let totalItems = 0;
      const items: ShoppingCartItem[] = aData.map(
        (item: ShoppingCartItemData) => {
          const sizes = Object.values(item.sizes_all).map(
            ({ id, name, amount }) => ({
              id,
              name,
              amount,
            })
          );
          totalItems += Number(item.count);

          return {
            id: item.item_id,
            name: item.name,
            price: item.format_price[1],
            photo: item.photos,
            description: item.material_descriptions.text,
            size: item.sizes,
            sizes: {
              XS: sizes[0],
              S: sizes[1],
              M: sizes[2],
              L: sizes[3],
            },
            color: {
              ...item.colors,
              value: `#${item.colors.value}`,
            },
            count: Number(item.count),
            postfix_symbol: item.currency.postfix_symbol,
            soldout: item.soldout,
            available: item.available,
          };
        }
      );

      return {
        items,
        summaryPrice: response.data.api_data.iSummaryPrice,
        amount: totalItems,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cart/addItem",
  async ({ id, sizeId }: AddingProps, { dispatch, rejectWithValue }) => {
    if (id) {
      dispatch(startAddingLoading(id));
    }
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        "/api/cart/add",
        {
          lang: 1,
          shop: 1,
          id: sizeId,
        }
      );

      if (response.status !== 200) {
        if (id) dispatch(stopAddingLoading(id));

        throw new Error(response.statusText);
      }

      id ? dispatch(stopAddingLoading(id)) : dispatch(getCartItemsAsync());

      dispatch(increaseAmount());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItemsAsync = createAsyncThunk(
  "cart/removeItems",
  async (
    { id, isAll }: { id: number; isAll?: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse<any, any> = await axios.post(
        "/api/cart/remove",
        {
          lang: 1,
          shop: 1,
          id,
          all: isAll,
        }
      );

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      dispatch(getCartItemsAsync());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
