import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeDetail: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipeSubscription!: Subscription;

  recipes: Recipe[] = [];
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  // passRecipe(recipeDetail: Recipe) {
  //   this.recipeDetail.emit(recipeDetail);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRouter });
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
