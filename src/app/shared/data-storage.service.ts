import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private url = 'https://maxi-course-recipe-book-default-rtdb.firebaseio.com/';
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put(this.url + 'recipes.json', recipes).subscribe((response) => {
      console.log('put response from fire base');
      console.log(response);
    });
  }

  fetchRecipes() {
    // return this.authService.userSubject.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     console.log(user);

    //   }),
    return this.http
      .get<Recipe[]>(
        this.url + 'recipes.json'
        //  {params: new HttpParams().set('auth', '' + user.token),}
      )
      .pipe(
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

    //combining this subscription inside above user Behavioural subject in exhaust map for user token authentication
    // return this.http.get<Recipe[]>(this.url + 'recipes.json').pipe(
    //   map((recipes: Recipe[]) => {
    //     return recipes.map((recipe: Recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : [],
    //       };
    //     });
    //   }),
    //   tap((recipes: Recipe[]) => {
    //     console.log('get response from fire base');
    //     console.log(recipes);
    //     this.recipeService.setRecipes(recipes);
    //   })
    // );

    // subscribe here or on component as per need
    // .subscribe((recipes) => {
    //   console.log('get response from fire base');
    //   console.log(recipes);
    //   this.recipeService.setRecipes(recipes);
    // });
  }
}
