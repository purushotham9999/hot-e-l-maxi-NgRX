import { RecipeService } from './../../recipe.service';
import { Recipe } from './../../recipe';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };

  @Input() index!: number;

  // @Output() recipeDetail: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  // sendRecipeDetail(recipe: Recipe) {
  //   this.recipeService.recipeSelected.emit(recipe);
  //   // this.recipeDetail.emit(recipe);
  // }
}
