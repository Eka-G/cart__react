import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "@api/index";
import { type ShoppingCartItem } from "@shared/typification";
import { RequestStatus } from "@api/types";
import {
  ShoppingCartResponce,
  ShoppingCartItemData,
} from "@api/types/shopping-cart-types";
import { type AppState } from "@store/store";

export interface CartState {
  items: ShoppingCartItem[];
  summaryPrice: number;
  status: RequestStatus;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  summaryPrice: 0,
  status: "idle",
  error: null,
};

export const getCartItemsAsync = createAsyncThunk(
  "cart/fetchItems",
  async () => {
    const response: AxiosResponse<ShoppingCartResponce, any> = await axios.post(
      "/api/cart/list",
      {
        lang: 1,
        shop: 1,
      }
    );

    const aData = await response.data.api_data.aData;
    const items: ShoppingCartItem[] = aData.map(
      (item: ShoppingCartItemData) => {
        const sizes = Object.values(item.sizes_all).map(
          ({ id, name, amount }) => ({
            id,
            name,
            amount,
          })
        );

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
    };
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cart/addItem",
  async (id: number, { dispatch }) => {
    await axios.post("/api/cart/add", {
      lang: 1,
      shop: 1,
      id,
    });

    dispatch(getCartItemsAsync());
  }
);

export const removeCartItemsAsync = createAsyncThunk(
  "cart/removeItems",
  async ({ id, isAll }: { id: number; isAll?: boolean }, { dispatch }) => {
    await axios.post("/api/cart/remove", {
      lang: 1,
      shop: 1,
      id,
      all: isAll,
    });

    dispatch(getCartItemsAsync());
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload.items;
        state.summaryPrice = action.payload.summaryPrice;
      })
      .addCase(getCartItemsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartItemAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(addCartItemAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeCartItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCartItemsAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(removeCartItemsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// export const {  } = cartSlice.actions;

export const selectCartItems = (state: AppState) => state.shoppingCart.items;
export const selectCartPrice = (state: AppState) =>
  state.shoppingCart.summaryPrice;

export default cartSlice.reducer;
