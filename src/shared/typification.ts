interface Photos {
  big: string;
  middle: string;
  small: string;
}

interface ColorInfo {
  id: number;
  name: string;
  value: string;
  price: string;
  amount: number;
  show: boolean;
  color_sample: any[];
}

interface OtherColorInfo {
  id: number;
  name: string;
  value: string;
  price: string;
  amount: number;
  photos: Photos[];
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
  color: ColorInfo;
  materials: {
    name: string;
    percent: number;
  }[];
  soldout: boolean;
}

export interface CardProps {
  info: Card;
}

export interface CardGridProps {
  cards: Card[];
}
