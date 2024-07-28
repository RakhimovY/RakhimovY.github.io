import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationController } from '../../modules/authorization/controllers/authorization.controller';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authorizationController = inject(AuthorizationController);
  const router = inject(Router);
  if (!authorizationController.isAuthorized() && !state.url.includes('auth')) {
    router.navigate(['auth']).then((_) => {
      window.scrollTo(0, 0);
    });
    return false;
  } else if (
    authorizationController.isAuthorized() &&
    (state.url.includes('auth') || state.url.includes('cabinet')) &&
    authorizationController.isAdmin()
  ) {
    router.navigate(['admin']).then((_) => {
      window.scrollTo(0, 0);
    });
    return false;
  } else if (
    authorizationController.isAuthorized() &&
    (state.url.includes('auth') || state.url.includes('admin')) &&
    authorizationController.isUser()
  ) {
    router.navigate(['cabinet']).then((_) => {
      window.scrollTo(0, 0);
    });
    return false;
  }
  return true;
};
