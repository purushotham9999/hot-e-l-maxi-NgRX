import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeDetail: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  // passRecipe(recipeDetail: Recipe) {
  //   this.recipeDetail.emit(recipeDetail);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRouter });
  }
}
