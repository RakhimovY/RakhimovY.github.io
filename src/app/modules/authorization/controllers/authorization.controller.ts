import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthorizationService } from '../service/authorization.service';
import { ISignIn, ISignUp } from '../interfaces/auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ECookie } from '../../../core/enums/cookie.enum';
import { EAuthority } from '../enums/authority.enum';
import { ToastrService } from 'ngx-toastr';
import { ERouting } from '../../../shared/enums/routing.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { IChangePass } from '../interfaces/change-pass.interface';

@Injectable({ providedIn: 'root' })
export class AuthorizationController {
  signLoading: WritableSignal<boolean> = signal(false);
  isAuthorized: WritableSignal<boolean> = signal(false);
  isMobile: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);
  isUser: WritableSignal<boolean> = signal(false);
  isCodeSent: WritableSignal<boolean> = signal(false);
  isCodeSent$ = toObservable(this.isCodeSent);

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    private cookieService: CookieService,
    private toastr: ToastrService,
  ) {}

  setCookie(name: string, value: any) {
    this.cookieService.set(name, value, undefined, '/');
  }

  signUp(body: ISignUp, refferalID?: string) {
    this.signLoading.set(true);
    this.authService
      .signUp(body, refferalID)
      .pipe(
        tap((data) => {
          this.signLoading.set(false);
          this.router.navigate([ERouting.AUTH]);
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

    const role = this.cookieService.get(ECookie.ROLE);

    if (role === EAuthority.ROLE_USER) {
      this.isUser.set(true);
      this.isAdmin.set(false);
    } else if (role === EAuthority.ROLE_ADMIN) {
      this.isUser.set(false);
      this.isAdmin.set(true);
    } else {
      this.isUser.set(false);
      this.isAdmin.set(false);
    }
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

  logOut() {
    this.cookieService.deleteAll('/');
    this.isAuthorized.set(false);
    this.router.navigate(['auth']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  sendOTPCode(email: string) {
    this.authService
      .sendOTPCode(email)
      .pipe(
        tap((value) => {
          value.success
            ? this.toastr.success(value.text)
            : this.toastr.warning(value.text);
          this.isCodeSent.set(value.success);
        }),
      )
      .subscribe();
  }

  changePass(params: IChangePass) {
    this.authService
      .changePass(params)
      .pipe(
        tap((resp) => {
          resp.success
            ? (this.toastr.success(resp.text),
              this.router.navigate(['auth']).then())
            : this.toastr.warning(resp.text);
        }),
      )
      .subscribe();
  }
}
