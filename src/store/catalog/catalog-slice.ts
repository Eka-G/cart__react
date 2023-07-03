import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type Card } from "@shared/typification";
import { type RequestStatus } from "@api/types";
import { type AppState } from "@store/store";
import getItemsAsync from "./asyncThunk";

interface CatalogState {
  items: Card[];
  status: RequestStatus;
  error: string | null;
}

const initialState: CatalogState = {
  items: [],
  status: "idle",
  error: null,
};

const setLoading = (items: Card[], currentId: number, isLoading: boolean) => {
  const currentItem = items.find((item) => item.id === currentId);

  if (currentItem) currentItem.addingLoading = isLoading;
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    startAddingLoading: ({ items }, action: PayloadAction<number>) => {
      setLoading(items, action.payload, true);
    },
    stopAddingLoading: ({ items }, action: PayloadAction<number>) => {
      setLoading(items, action.payload, false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(getItemsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { startAddingLoading, stopAddingLoading } = catalogSlice.actions;

export const selectItems = (state: AppState) => state.catalog.items;
export const getCatalogLoading = (state: AppState) =>
  state.catalog.status === "loading";

export default catalogSlice.reducer;
