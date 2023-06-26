export interface Responce {
  api_execute_time: string;
  api_success: boolean;
  api_messages: any[];
  api_is_developer: boolean;
  api_platform_version: null;
  api_code: number;
  api_authorize: boolean;
  api_data: APIData;
  api_data_success: boolean;
  api_data_result: boolean;
  api_exception: any[];
  api_version: string;
  api_host: string;
}

export interface APIData {
  aProduct: ResponceData[];
}

export interface ResponceData {
  id: number;
  template: string;
  brand_name: string;
  category_id: string;
  category_ids: string[];
  parent_category_ids: Array<ParentCategoryID[]>;
  category_name: string;
  type: string;
  article: string;
  popular: number;
  size_details: any[];
  price: number;
  block: boolean;
  original_price: number;
  coming_soon: boolean;
  date_create: string;
  saleaction: boolean;
  currency: Currency;
  photos: Photo[];
  videos: any[];
  video_cover: any[];
  favorite: boolean;
  count: number;
  subscribe: boolean;
  season: null;
  name_old: string;
  name: string;
  descriptions: Descriptions;
  material_descriptions: Descriptions;
  measurements: Measurements;
  measurements_unit: string;
  model: Model;
  stores: any[];
  sizes: { [key: string]: Size };
  is_ffm: boolean;
  colors: Colors;
  format_price: string[];
  details_name: DetailsName;
  details: Details;
  soldout: boolean;
  available: boolean;
  url: string;
  care: string[];
}

export interface Colors {
  current: Current;
  other: Other[];
}

export interface Current {
  id: number;
  name: string;
  amount: number;
  value: string;
  show: boolean;
  price: string;
  color_sample: any[];
}

export interface Other {
  id: number;
  name: string;
  amount: number;
  value: string;
  show: boolean;
  price: string;
  color_sample: ColorSample;
  photo: Photo;
}

export interface ColorSample {
  pcs_article: string;
  pcs_index: number;
  pcs_x: number;
  pcs_y: number;
  pcs_path: string;
  pi_photo: string;
}

export interface Photo {
  thumbs: { [key: string]: string };
  blurhash: string;
  basicColor: BasicColor;
  big?: string;
}

export interface BasicColor {
  colors: string[];
  luminance: number;
}

export interface Currency {
  id: number;
  prefix: string;
  prefix_symbol: string;
  postfix: string;
  postfix_symbol: string;
}

export interface Descriptions {
  mark_down: string;
  html: string;
  text: string;
}

export interface Details {
  materials: { [key: string]: Material };
}

export interface Material {
  name: string;
  percent: number;
}

export interface DetailsName {
  materials: string;
}

export interface Measurements {
  XS: SizeInfo[];
  S: SizeInfo[];
  M: SizeInfo[];
  L: SizeInfo[];
}

export interface SizeInfo {
  name: string;
  value: number;
}

export interface Model {
  size: string;
  growth: number;
  chest: number;
  waist: number;
  hips: number;
}

export interface ParentCategoryID {
  id: string;
  url: string;
  name: string;
}

export interface Size {
  id: number;
  name: string;
  amount: number;
  show: boolean;
  barcode: string;
  subscribe: boolean;
}
