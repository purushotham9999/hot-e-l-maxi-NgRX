import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() recipeFlag: EventEmitter<boolean> = new EventEmitter<boolean>();

  collapsed = true;
  constructor() {}

  ngOnInit(): void {
    this.recipeFlag.emit(true);
  }

  showRecipes(flag: boolean) {
    console.log(flag);
    this.recipeFlag.emit(flag);
  }
}
