export type RequestStatus = "idle" | "loading" | "failed";

export interface Responce {
  api_execute_time: string;
  api_success: boolean;
  api_messages: any[];
  api_is_developer: boolean;
  api_platform_version: null;
  api_code: number;
  api_authorize: boolean;
  api_data_success: boolean;
  api_data_result: boolean;
  api_exception: any[];
  api_version: string;
  api_host: string;
}

export interface ResponceData {
  id: number;
  template: string;
  category_ids: string[];
  parent_category_ids: Array<ParentCategoryID[]>;
  article: string;
  popular: number;
  size_details: any[];
  price: number;
  block: boolean;
  original_price: number;
  date_create: string;
  saleaction: boolean;
  currency: Currency;
  videos: any[];
  video_cover: any[];
  season: null;
  name_old: string;
  name: string;
  material_descriptions: MaterialDescriptions;
  measurements: Measurements;
  measurements_unit: string;
  is_ffm: boolean;
  colors: Colors;
  format_price: string[];
  details_name: DetailsName;
  soldout: boolean;
  available: boolean;
  care: string[];
}

export interface Colors {
  current: CurrentColor;
  other: OtherColors[];
}

export interface CurrentColor {
  id: number;
  name: string;
  amount: number;
  value: string;
  show: boolean;
  price: string;
  color_sample: any[];
}

export interface OtherColors {
  id?: number;
  name: string;
  amount: number;
  value: string;
  show: boolean;
  price: string;
  color_sample: ColorSample;
  photo?: Photo;
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

export interface MaterialDescriptions {
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
