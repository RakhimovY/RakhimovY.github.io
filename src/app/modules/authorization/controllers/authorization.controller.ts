import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthorizationService } from '../service/authorization.service';
import { ISignIn, ISignUp } from '../types/auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ECookie } from '../../../core/enums/cookie.enum';

@Injectable({ providedIn: 'root' })
export class AuthorizationController {
  signLoading: WritableSignal<boolean> = signal(false);
  isAuthorized: WritableSignal<boolean> = signal(false);
  isMobile: WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private cookieService: CookieService,
  ) {}

  signUp(body: ISignUp) {
    this.signLoading.set(true);
    this.authService
      .signUp(body)
      .pipe(
        tap((data) => {
          this.signLoading.set(false);
          this.router.navigate(['sign_in']).then();
        }),
        catchError((error: HttpErrorResponse) => {
          this.signLoading.set(false);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  checkAuthStatus() {
    this.cookieService.get(ECookie.ACCESS_TOKEN)
      ? this.isAuthorized.set(true)
      : this.isAuthorized.set(false);
  }

  logOut() {
    this.cookieService.delete(ECookie.ACCESS_TOKEN);
    this.isAuthorized.set(false);
  }

  signIn(body: ISignIn) {
    this.signLoading.set(true);
    this.authService
      .signIn(body)
      .pipe(
        tap((data) => {
          this.signLoading.set(false);
          this.setCookie('access_token', data);
          this.setCookie('refresh_token', data);
          this.isAuthorized.set(true);
          this.router.navigate(['main']).then();
        }),
        catchError((error: HttpErrorResponse) => {
          this.signLoading.set(false);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  setCookie(name: string, value: any) {
    this.cookieService.set(name, value.token);
  }
}
