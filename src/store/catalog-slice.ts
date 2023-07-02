import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "@api/index";
import { type Card } from "@shared/typification";
import {
  type RequestStatus,
  CatalogResponce,
  CatalogItemData,
} from "@api/types";
import { type AppState } from "@store/store";

export interface CatalogState {
  items: Card[];
  loading: RequestStatus;
  error: string | null;
}

const initialState: CatalogState = {
  items: [],
  loading: "idle",
  error: null,
};

export const getItemsAsync = createAsyncThunk(
  "catalog/fetchItems",
  async () => {
    const response: AxiosResponse<CatalogResponce, any> = await axios.post(
      "/api/category/get_category_product_list",
      {
        category: "clothes",
        lang: 1,
        shop: 1,
      }
    );

    const dataProducts = await response.data.api_data.aProduct;
    const items: Card[] = dataProducts.map((item: CatalogItemData) => {
      const sizes = Object.values(item.sizes).map(({ id, name, amount }) => ({
        id,
        name,
        amount,
      }));

      const materials = Object.values(item.details.materials).map(
        ({ name, percent }) => ({
          name,
          percent,
        })
      );

      return {
        id: item.id,
        category_name: item.category_name,
        name: item.name,
        photos: [
          {
            big: item.photos[0].big || "",
            middle: Object.values(item.photos[0].thumbs)[0] || "",
            small: Object.values(item.photos[0].thumbs)[1] || "",
          },
        ],
        description: item.descriptions.text,
        price: item.format_price[1],
        sizes,
        color: {
          ...item.colors.current,
          value: `#${item.colors.current.value}`,
        },
        materials,
        soldout: item.soldout,
        addingLoading: false,
      };
    });

    return items;
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    //TODO refactor code repeat
    startAddingLoading: ({ items }, action: PayloadAction<number>) => {
      const currentItem = items.find((item) => item.id === action.payload);

      if (currentItem) {
        currentItem.addingLoading = true;
      }
    },
    stopAddingLoading: ({ items }, action: PayloadAction<number>) => {
      const currentItem = items.find((item) => item.id === action.payload);

      if (currentItem) {
        currentItem.addingLoading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsAsync.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.loading = "idle";
        state.items = action.payload;
      })
      .addCase(getItemsAsync.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { startAddingLoading, stopAddingLoading } = catalogSlice.actions;

export const selectItems = (state: AppState) => state.catalog.items;
export const getCatalogLoading = (state: AppState) =>
  state.catalog.loading === "loading";

export default catalogSlice.reducer;
