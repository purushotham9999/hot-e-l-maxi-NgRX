import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() recipeFlag: EventEmitter<boolean> = new EventEmitter<boolean>();

  collapsed = true;
  authSubscription!: Subscription;
  isAuthenticated = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.recipeFlag.emit(true);
    this.authService.userSubject.subscribe((user) => {
      this.isAuthenticated =
        user.token === null ? this.isAuthenticated : !this.isAuthenticated;
      console.log('user isAuthenticated');

      // console.log('user isAuthenticated ' + !user);
      // console.log(!!user);
      // console.log(user.token === '' ? false : true);
      // console.log(user);
      // console.log('user token');
      // console.log(user.token);

      console.log(this.isAuthenticated);
    });
  }

  // showRecipes(flag: boolean) {
  //   console.log(flag);
  //   this.recipeFlag.emit(flag);
  // }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onLogOut() {
    this.authService.logOut();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
