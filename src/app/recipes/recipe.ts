import { Ingredient } from './../shared/ingredient';
export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
