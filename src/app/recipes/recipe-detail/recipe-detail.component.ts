import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Ingredient } from './../../shared/ingredient';
import { Recipe } from './../recipe';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };
  ingredients: Ingredient[] = [];
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {}

  selectIngredientsToShoppingList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
  addIngredientsToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.ingredients);
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  // addIngredientsToShoppingList() {
  //   this.ingredients.forEach((ingredient) => {
  //     this.shoppingListService.addIngredients(ingredient);
  //   });
  // }
}
