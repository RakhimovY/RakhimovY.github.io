import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ECookie } from '../enums/cookie.enum';
import { tap } from 'rxjs';
import { AuthorizationController } from '../../modules/authorization/controllers/authorization.controller';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const authorizationController = inject(AuthorizationController);
  const toastr = inject(ToastrService);
  const authToken = cookieService.get(ECookie.ACCESS_TOKEN);

  const authReq = req.clone({
    setHeaders: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });
  return next(authReq).pipe(
    tap(
      () => {},
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && authorizationController.isAuthorized()) {
            toastr.error('Ваша сессия истекла, повторите попытку');
            authorizationController.logOut();
          } else if (error.error.message || error.error.error) {
            toastr.error(error.error.message ?? error.error.error);
          } else {
            toastr.error('Что-то пошло не так.', ' Попробуйте позже.');
          }
        }
      },
    ),
  );
};
