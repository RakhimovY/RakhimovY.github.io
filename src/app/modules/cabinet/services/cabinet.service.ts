import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEditUserInfo, IUserInfo } from '../interface/user.interface';
import { catchError, tap, throwError } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CabinetService {
  userAPI = environment.userAPI;
  userInfo: WritableSignal<IUserInfo | null> = signal(null);
  userInfo$ = toObservable(this.userInfo);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) {}

  getUserInfo() {
    this.httpClient
      .get<IUserInfo>(`${this.userAPI}user-info`)
      .pipe(
        tap((userInfo) => this.userInfo.set(userInfo)),
        catchError((error) => {
          this.toastr.error(error.error.massage ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  editUserInfo(body: IEditUserInfo) {
    this.httpClient
      .post<IUserInfo>(`${this.userAPI}edit-user-info`, body)
      .pipe(
        tap((userInfo) => {
          this.userInfo.set(userInfo);
          this.toastr.success('Данные успешно изменены');
        }),
        catchError((error) => {
          this.toastr.error(error.error.massage ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
