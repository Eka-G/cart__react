import { createSlice } from "@reduxjs/toolkit";
import { type ShoppingCartItem } from "@shared/typification";
import { RequestStatus } from "@api/types";
import { type AppState } from "@store/store";
import {
  getCartItemsAsync,
  addCartItemAsync,
  removeCartItemsAsync,
} from "./asyncThunk";

export interface CartState {
  items: ShoppingCartItem[];
  summaryPrice: number;
  cartStatus: RequestStatus;
  itemStatus: RequestStatus;
  amount: number;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  summaryPrice: 0,
  cartStatus: "idle",
  itemStatus: "idle",
  amount: 0,
  error: null,
};

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
          error: null,
        };
      })
      .addCase(getCartItemsAsync.rejected, (state, action) => {
        return {
          ...state,
          items: [],
          summaryPrice: 0,
          cartStatus: "failed",
          isEmpty: true,
          amount: 0,
          error: action.payload as string,
        };
      })
      .addCase(addCartItemAsync.pending, (state) => {
        state.itemStatus = "loading";
      })
      .addCase(addCartItemAsync.fulfilled, (state) => {
        state.itemStatus = "idle";
        state.error = null;
      })
      .addCase(addCartItemAsync.rejected, (state, action) => {
        state.itemStatus = "failed";
        state.error = action.payload as string;
      })
      .addCase(removeCartItemsAsync.pending, (state) => {
        state.itemStatus = "loading";
      })
      .addCase(removeCartItemsAsync.fulfilled, (state) => {
        state.itemStatus = "idle";
        state.error = null;
      })
      .addCase(removeCartItemsAsync.rejected, (state, action) => {
        state.itemStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { increaseAmount, decreaseAmount } = cartSlice.actions;

export const selectCartItems = (state: AppState) => state.shoppingCart.items;
export const selectCartPrice = (state: AppState) =>
  state.shoppingCart.summaryPrice;
export const selectCartAmount = (state: AppState) => state.shoppingCart.amount;
export const selectCartError = (state: AppState) => state.shoppingCart.error;
export const getCartLoading = (state: AppState) =>
  state.shoppingCart.cartStatus === "loading";
export const getCartChangingLoading = (state: AppState) =>
  state.shoppingCart.itemStatus === "loading";

export default cartSlice.reducer;
