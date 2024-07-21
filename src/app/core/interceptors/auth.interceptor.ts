import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ECookie } from '../enums/cookie.enum';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authToken = cookieService.get(ECookie.ACCESS_TOKEN);

  const authReq = req.clone({
    setHeaders: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });

  return next(authReq).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, event.headers);
      }
    }),
  );
};
