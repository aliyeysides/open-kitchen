export interface Recipe {
  _id: string;
  name: string;
  video: VideoUpload;
  thumbnail: Thumbnail;
  steps: RecipeStep[];
}

export interface Thumbnail {
  _id: string;
  name: string;
  url: string;
}

export interface RecipeStep {
  order: number;
  instruction: string;
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
