//
//CARD TYPES
interface Photos {
  big: string;
  middle: string;
  small: string;
}

interface CardColorInfo {
  id: number;
  name: string;
  value: string;
  price: string;
  amount: number;
  show: boolean;
  color_sample: any[];
}

export interface Card {
  id: number;
  category_name: string;
  name: string;
  photos: Photos[];
  description: string;
  price: string;
  sizes: {
    id: number;
    name: string;
    amount: number;
  }[];
  color: CardColorInfo;
  materials: {
    name: string;
    percent: number;
  }[];
  soldout: boolean;
  addingLoading: boolean;
}

export interface CardProps {
  info: Card;
}

export interface CardGridProps {
  cards: Card[];
}

//
// SHOPPING CART TYPES

export interface ShoppingCartColor {
  name: string;
  amount: number;
  value: string;
  show: boolean;
  price: string;
  color_sample: any;
}

export interface ShoppingCartSizes {
  id: number;
  name: string;
  amount: number;
}

export interface ShoppingCartItem {
  id: number;
  name: string;
  price: string;
  photo: string;
  size: string;
  sizes: { [key: string]: ShoppingCartSizes };
  color: ShoppingCartColor;
  count: number;
  postfix_symbol: string;
  soldout: boolean;
  available: boolean;
}

export interface ShoppingCartItemProps {
  info: ShoppingCartItem;
}

export interface ShoppingCartGridProps {
  items: ShoppingCartItem[];
  summaryPrice: number;
}
