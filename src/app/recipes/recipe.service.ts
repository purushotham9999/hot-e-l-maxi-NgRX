import { Ingredient } from './../shared/ingredient';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   {
  //     name: 'Burger',
  //     description: 'This is a Burger',
  //     imagePath:
  //       'https://media.istockphoto.com/photos/beef-burger-on-black-background-for-fast-food-restaurant-design-or-picture-id1185866014?k=20&m=1185866014&s=612x612&w=0&h=AkuJQg4zheXwBJ8jkNzRYAsBthKho0ATTm7i7hh2gZg=',
  //     ingredients: [
  //       { name: 'Cheese', amount: 1 },
  //       { name: 'Buns', amount: 2 },
  //     ],
  //   },
  //   {
  //     name: 'Sandwhich',
  //     description: 'This is a Sandwhich',
  //     imagePath:
  //       'https://image.shutterstock.com/image-photo/sandwich-ham-cheese-tomatoes-lettuce-260nw-1766588897.jpg',
  //     ingredients: [
  //       { name: 'Cheese', amount: 1 },
  //       { name: 'Bread', amount: 4 },
  //     ],
  //   },
  // ];

  private recipes: Recipe[] = [];
  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
