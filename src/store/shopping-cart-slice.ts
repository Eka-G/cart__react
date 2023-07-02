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
import { startAddingLoading, stopAddingLoading } from "@store/catalog-slice";

export interface CartState {
  items: ShoppingCartItem[];
  summaryPrice: number;
  cartStatus: RequestStatus;
  itemStatus: RequestStatus;
  amount: number;
  error: string | null;
}

export interface AddingProps {
  id?: number;
  sizeId: number;
}

const initialState: CartState = {
  items: [],
  summaryPrice: 0,
  cartStatus: "idle",
  itemStatus: "idle",
  amount: 0,
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
  }
);

export const addCartItemAsync = createAsyncThunk(
  "cart/addItem",
  async ({ id, sizeId }: AddingProps, { dispatch }) => {
    if (id) {
      dispatch(startAddingLoading(id));
    }

    await axios.post("/api/cart/add", {
      lang: 1,
      shop: 1,
      id: sizeId,
    });

    id ? dispatch(stopAddingLoading(id)) : dispatch(getCartItemsAsync());

    dispatch(increaseAmount());
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
  reducers: {
    increaseAmount: (state) => {
      return {
        ...state,
        amount: state.amount + 1,
      };
    },
    decreaseAmount: (state) => {
      const resultAmount = state.amount === 0 ? state.amount : state.amount - 1;

      return {
        ...state,
        amount: resultAmount,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(getCartItemsAsync.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload.items,
          summaryPrice: action.payload.summaryPrice,
          cartStatus: "idle",
          isEmpty: !action.payload.items.length,
          amount: action.payload.amount,
        };
      })
      .addCase(getCartItemsAsync.rejected, (state) => {
        state.cartStatus = "failed";
      })
      .addCase(addCartItemAsync.pending, (state, action) => {
        state.itemStatus = "loading";
      })
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        state.itemStatus = "idle";
      })
      .addCase(addCartItemAsync.rejected, (state, action) => {
        state.itemStatus = "failed";
      })
      .addCase(removeCartItemsAsync.pending, (state) => {
        state.itemStatus = "loading";
      })
      .addCase(removeCartItemsAsync.fulfilled, (state) => {
        state.itemStatus = "idle";
      })
      .addCase(removeCartItemsAsync.rejected, (state) => {
        state.itemStatus = "failed";
      });
  },
});

export const { increaseAmount, decreaseAmount } = cartSlice.actions;

export const selectCartItems = (state: AppState) => state.shoppingCart.items;
export const selectCartPrice = (state: AppState) =>
  state.shoppingCart.summaryPrice;
export const selectCartAmount = (state: AppState) => state.shoppingCart.amount;
export const getCartLoading = (state: AppState) =>
  state.shoppingCart.cartStatus === "loading";
export const getCartChangingLoading = (state: AppState) =>
  state.shoppingCart.itemStatus === "loading";

export default cartSlice.reducer;
