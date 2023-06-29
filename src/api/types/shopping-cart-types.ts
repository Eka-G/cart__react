import {
  Responce,
  ResponceData,
  Photo,
  Size,
  Colors,
} from "@/api/types/common-types";

export interface ShoppingCartResponce extends Responce {
  api_data: ShoppingCartData;
}

export interface ShoppingCartData {
  aData: ShoppingCartItemData[];
  iSummaryPrice: number;
  iCount: number;
  iCountSale: number;
  iSalePrice: number;
  iNonSalePrice: number;
}

export interface ShoppingCartItemData extends ResponceData {
  photos: string;
  count: string;
  sizes: string;
  otherData: any[];
  item_id_hash: string;
  item_id: number;
  amount: number;
  is_action: boolean;
  gift: boolean;
  photos_all: Photo[];
  colors: {
    amount: number;
    color_sample: any[];
    name: string;
    price: string;
    show: boolean;
    value: string;
  };
  colors_all: Colors[];
  sizes_all: { [key: string]: Size };
  barcode: string;
}
