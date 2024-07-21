import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthorizationService } from '../service/authorization.service';
import { ISignIn, ISignUp } from '../types/auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ECookie } from '../../../core/enums/cookie.enum';
import { EAuthority } from '../enums/authority.enum';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthorizationController {
  signLoading: WritableSignal<boolean> = signal(false);
  isAuthorized: WritableSignal<boolean> = signal(false);
  isMobile: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);
  isUser: WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private cookieService: CookieService,
    private toastr: ToastrService,
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
          this.toastr.error(error.error.message ?? error.error.error);
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
          this.setCookie('access_token', data.token);
          this.setCookie('refresh_token', data.token);
          this.setCookie('role', data.privilege[0].authority);
          if (data.privilege[0].authority === EAuthority.ROLE_ADMIN) {
            this.isAdmin.set(true);
            this.isUser.set(false);
            this.router.navigate(['admin']).then((_) => {
              window.scrollTo(0, 0);
            });
          } else if (data.privilege[0].authority === EAuthority.ROLE_USER) {
            this.isAdmin.set(false);
            this.isUser.set(true);
            this.router.navigate(['cabinet']).then((_) => {
              window.scrollTo(0, 0);
            });
          } else {
            this.router.navigate(['main']).then((_) => {
              window.scrollTo(0, 0);
            });
          }
          this.isAuthorized.set(true);
        }),
        catchError((error: HttpErrorResponse) => {
          this.signLoading.set(false);
          this.toastr.error(error.error.message ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  setCookie(name: string, value: any) {
    this.cookieService.set(name, value);
  }
}
