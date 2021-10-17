import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private url = 'https://maxi-course-recipe-book-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.url + 'recipes.json', recipes).subscribe((response) => {
      console.log('put response from fire base');
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url + 'recipes.json').pipe(
      map((recipes: Recipe[]) => {
        return recipes.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes: Recipe[]) => {
        console.log('get response from fire base');
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      })
    );
    // .subscribe((recipes) => {
    //   console.log('get response from fire base');
    //   console.log(recipes);
    //   this.recipeService.setRecipes(recipes);
    // });
  }
}
