import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from '../recipes/recipes-routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    RouterModule.forChild([
      {
        path: 'shopping-list',
        component: ShoppingListComponent,
      },
    ]),
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    FormsModule,
  ],
  // exports: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
