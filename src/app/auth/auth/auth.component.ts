import { Observable } from 'rxjs';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignUpResponse } from '../sign-up-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error!: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    // console.log(authForm.value.email);
    this.isLoading = !this.isLoading;
    console.log(authForm);
    let authObs: Observable<SignUpResponse>;
    //get whole response object (instead onf only body) show appropriate message based on response code
    // let authObs: Observable<any>;
    if (this.isLoginMode) {
      authObs = this.authService.logIn(
        authForm.value.email,
        authForm.value.password
      );
    } else {
      authObs = this.authService.signUp(
        authForm.value.email,
        authForm.value.password
      );
    }
    authObs.subscribe(
      (resposne) => {
        this.isLoading = !this.isLoading;
        console.log(resposne);
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        this.isLoading = !this.isLoading;
        this.error = errorMsg;
        // 'An error ouccured ' + errorResp.error.error.errors[0].message;
        console.log(errorMsg);
      }
    );
    authForm.reset();
  }
}
