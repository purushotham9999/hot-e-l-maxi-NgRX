import { Ingredient } from './../../shared/ingredient';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('inputName') inputNameREf!: ElementRef;
  // @ViewChild('inputAmount') inputAmountREf!: ElementRef;
  // @Output() newIngredient = new EventEmitter<Ingredient>();

  @ViewChild('f') shoppingListForm!: NgForm;

  newIngredient!: Ingredient;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        // console.log(index);
        this.newIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.newIngredient.name,
          amount: this.newIngredient.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    // this.newIngredient.emit({
    //   name: this.inputNameREf.nativeElement.value,
    //   amount: this.inputAmountREf.nativeElement.value,
    // });

    //setting values using local reference
    // this.newIngredient = {
    //   name: this.inputNameREf.nativeElement.value,
    //   amount: this.inputAmountREf.nativeElement.value,
    // };

    //setting values using template driven form
    const ingredient: Ingredient = {
      name: form.value.name,
      amount: form.value.amount,
    };
    if (!this.editMode) {
      this.shoppingListService.addIngredient(ingredient);
    } else {
      this.shoppingListService.editIngredient(this.editedItemIndex, ingredient);
      this.editMode = !this.editMode;
    }

    this.shoppingListForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
