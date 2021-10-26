import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // eventRef!: Event;
  // @Input() openItemsClass: string = '';
  @HostBinding('class.open') isOpenClass: boolean = false;
  constructor(private elRef: ElementRef) {}

  @HostListener('click') openMenu() {
    this.isOpenClass = !this.isOpenClass;
    console.log('DropdownDirective open = ' + this.isOpenClass);
  }

  // @HostListener('document:click', ['$event']) openMenu() {
  //   this.eventRef = event;
  //   this.isOpenClass = this.elRef.nativeElement.contains(this.eventRef.target)
  //     ? !this.isOpenClass
  //     : false;
  // }
}
