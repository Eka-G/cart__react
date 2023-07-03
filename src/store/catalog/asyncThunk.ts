import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "@api/index";
import { CatalogResponce, CatalogItemData } from "@api/types";
import { type Card } from "@shared/typification";

const getItemsAsync = createAsyncThunk(
  "catalog/fetchItems",
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<CatalogResponce, any> = await axios.post(
        "/api/category/get_category_product_list",
        {
          category: "clothes",
          lang: 1,
          shop: 1,
        }
      );

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

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
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export default getItemsAsync;
