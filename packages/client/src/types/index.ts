export interface Recipe {
  _id: string;
  ytId: string;
  name: string;
  tags: string[];
  video?: VideoUpload;
  thumbnail?: Thumbnail;
  steps: RecipeStep[];
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit?: string;
  price_id: string;
}

export interface Thumbnail {
  _id: string;
  name: string;
  url: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
  startTime: number;
  ingredients?: RecipeIngredient[];
}

export interface VideoUpload {
  _id: string;
  name: string;
  url: string;
}

export interface Ingredient {
  _id: string;
  name: string;
}

export type FDCDataType = 'Foundation' | 'Branded' | 'SR Legacy';

export interface FDCFood {
  fdcId: string;
  description: string;
  dataType: FDCDataType;
}

export interface User {
  name: string;
  picture: string;
}
