import { Ingredient } from './../shared/ingredient';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    {
      name: 'Burger',
      description: 'This is Burger',
      imagePath:
        'https://media.istockphoto.com/photos/beef-burger-on-black-background-for-fast-food-restaurant-design-or-picture-id1185866014?k=20&m=1185866014&s=612x612&w=0&h=AkuJQg4zheXwBJ8jkNzRYAsBthKho0ATTm7i7hh2gZg=',
      ingredients: [
        { name: 'cheese', amount: 1 },
        { name: 'Buns', amount: 2 },
      ],
    },
    {
      name: 'Sandwhich',
      description: 'This is Sandwhich',
      imagePath:
        'https://image.shutterstock.com/image-photo/sandwich-ham-cheese-tomatoes-lettuce-260nw-1766588897.jpg',
      ingredients: [
        { name: 'cheese', amount: 1 },
        { name: 'Bread', amount: 4 },
      ],
    },
  ];
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
