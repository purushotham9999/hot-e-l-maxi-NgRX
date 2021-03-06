import { AuthService } from './auth/auth.service';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'hot-e-l-Maxi';
  // @Input() showRecipes: boolean;

  // constructor(){ this.showRecipes = true; }
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    // console.log('app ' + this.showRecipes);
    this.authService.autoLogin();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes called');
    console.log(changes);
    // throw new Error('Method not implemented.');
  }

  // updateFlag(event: boolean) {
  //   this.showRecipes = event;
  // }
}
