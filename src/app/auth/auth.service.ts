import { Router } from '@angular/router';
import { User } from './user.model';
import { SignUpResponse } from './sign-up-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User>(new User('', '', '', new Date()));
  tokenExpirationTimer: any;

  private authKey = 'AIzaSyAgzCSaPqJxf2N7jiuJGdHVuwHctkFQvL0';
  private signUpEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    this.authKey;
  private loginEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.authKey;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<SignUpResponse>(this.signUpEndpoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<SignUpResponse>(
        this.loginEndpoint,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
        //get whole response object (instead onf only body) show appropriate message based on response code
        // { observe: 'response' }
      )
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse('' + localStorage.getItem('userData'));

    if (!user) {
      return;
    }

    const loadedUser: User = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
      const expirationDuration =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  logOut() {
    this.userSubject.next(new User('', '', '', new Date()));
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }
  private handleError(errorResp: HttpErrorResponse) {
    console.log('From signup');
    console.log(errorResp);
    console.log(errorResp.error.error.errors[0].message);
    let errorMsg = 'An error occured: ';
    if (
      !errorResp.error ||
      !errorResp.error.error ||
      !errorResp.error.error.errors
    ) {
      return throwError(errorMsg + 'Unkown');
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = errorMsg + 'You are already signed up please login';
        // errorMsg = errorMsg + errorResp.error.error.errors[0].message;
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg =
          errorMsg +
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;

      case 'INVALID_PASSWORD':
        errorMsg =
          errorMsg +
          'The password is invalid or the user does not have a password.';
        break;

      case 'USER_DISABLED':
        errorMsg =
          errorMsg + 'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(errorMsg);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIN: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIN * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIN * 1000);
    console.log('handleAuthentication');
    console.log(user);

    localStorage.setItem('userData', JSON.stringify(user));
  }
}
