import { ShoppingListService } from './../shopping-list.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputName') inputNameREf!: ElementRef;
  @ViewChild('inputAmount') inputAmountREf!: ElementRef;
  // @Output() newIngredient = new EventEmitter<Ingredient>();
  newIngredient!: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  addItem() {
    // this.newIngredient.emit({
    //   name: this.inputNameREf.nativeElement.value,
    //   amount: this.inputAmountREf.nativeElement.value,
    // });
    this.newIngredient = {
      name: this.inputNameREf.nativeElement.value,
      amount: this.inputAmountREf.nativeElement.value,
    };

    this.shoppingListService.addIngredient(this.newIngredient);
  }
}
