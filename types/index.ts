export type QueryParams = {
  foodName: string | null;
  category: string | null;
  minCalories: string | null;
  maxCalories: string | null;
  minPrice: string | null;
  maxPrice: string | null;
};

export type Category =
  | 'chicken'
  | 'curry'
  | 'icecream'
  | 'fruit'
  | 'drink'
  | 'fish'
  | 'rice';
