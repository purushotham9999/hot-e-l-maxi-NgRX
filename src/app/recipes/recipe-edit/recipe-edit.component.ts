import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  allowEdit: boolean = false;
  recipeForm!: FormGroup;
  constructor(
    private activatedRuote: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRuote.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.allowEdit = params['id'] != null;
      // console.log('allowEdit', this.allowEdit);
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let ingredients: FormArray = new FormArray([]);

    if (this.allowEdit) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: ingredients,
    });
  }

  get ingredientsControls() {
    return this.recipeForm.get('ingredients') as FormArray;
    // return <FormArray>this.recipeForm.get('ingredients');
  }
  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
    // (<FormArray>this.recipeForm.get('ingredients')).push(
    //   new FormGroup({
    //     name: new FormControl(''),
    //     amount: new FormControl(''),
    //   })
    // );
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRuote });
  }
  onSubmit() {
    console.log(this.recipeForm);
    const recipe: Recipe = {
      name: this.recipeForm.value['name'],
      imagePath: this.recipeForm.value['imagePath'],
      description: this.recipeForm.value['description'],
      ingredients: this.recipeForm.value['ingredients'],
    };
    console.log(recipe);
    if (this.allowEdit) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      // this.router.navigate(['../'], { relativeTo: this.activatedRuote });
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      // console.log('size resp ' + this.recipeService.getRecipes.length);
      // this.router.navigate(['../'], {relativeTo: this.activatedRuote,});
    }
    this.onCancel();
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
