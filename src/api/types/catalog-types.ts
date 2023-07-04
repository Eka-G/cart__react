import {
  Responce,
  ResponceData,
  Photo,
  Colors,
  MaterialDescriptions,
  Model,
  Size,
  Details,
} from "@api/types/common-types";

export interface CatalogResponce extends Responce {
  api_data: CatalogData;
}

export interface CatalogData {
  aProduct: CatalogItemData[];
}

export interface CatalogItemData extends ResponceData {
  brand_name: string;
  category_id: string;
  category_name: string;
  type: string;
  coming_soon: boolean;
  photos: Photo[];
  colors: Colors;
  favorite: boolean;
  count: number;
  subscribe: boolean;
  descriptions: MaterialDescriptions;
  model: Model;
  stores: any[];
  sizes: { [key: string]: Size };
  details: Details;
  url: string;
}
