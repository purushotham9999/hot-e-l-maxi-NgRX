import { RecipeService } from './recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  // recipeDetail: Recipe = { name: '', description: '', imagePath: '' };
  // selectedRecipeDetails!: Recipe;
  constructor() // private recipeService: RecipeService
  {}

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipeDetails = recipe;
    // });
  }

  // Data passsed using Input Output
  // getRecipe(recipeDetail: Recipe) {
  //   this.recipeDetail = recipeDetail;
  // }
}
