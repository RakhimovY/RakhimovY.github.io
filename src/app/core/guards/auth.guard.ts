import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ECookie } from '../enums/cookie.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  if (!cookieService.get(ECookie.ACCESS_TOKEN) && !state.url.includes('auth')) {
    router.navigate(['auth']).then();
    return false;
  } else if (
    !!cookieService.get(ECookie.ACCESS_TOKEN) &&
    state.url.includes('auth')
  ) {
    router.navigate(['cabinet']).then();
    return true;
  }
  return true;
};
