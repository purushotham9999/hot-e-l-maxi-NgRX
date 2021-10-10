import { RecipeService } from './../recipe.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Ingredient } from './../../shared/ingredient';
import { Recipe } from './../recipe';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe = {
  //   name: '',
  //   description: '',
  //   imagePath: '',
  //   ingredients: [],
  // };
  recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };

  ingredients: Ingredient[] = [];
  id!: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      // this.recipeService.getRecipes().find((recipe: Recipe) => {
      //   recipe.name === name, (this.recipe = recipe);
      // });
      //   this.recipe = this.recipeService
      //     .getRecipes()
      //     .filter((recipe: Recipe) => recipe.name === name)[0];
      // });
    });
  }

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

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRouter });
    // this.router.navigate(['../', this.id, 'edit'], {
    //   relativeTo: this.activatedRouter,
    // });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/']);
    // this.router.navigate(['/recipes']);
  }
}
