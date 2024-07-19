import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IEditUserInfo, IUserInfo } from '../interface/user.interface';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CabinetService {
  userAPI = environment.userAPI;
  userInfo: WritableSignal<IUserInfo | null> = signal(null);
  userInfo$ = toObservable(this.userInfo);

  constructor(private httpClient: HttpClient) {}

  getUserInfo() {
    this.httpClient
      .get<IUserInfo>(`${this.userAPI}user-info`)
      .pipe(tap((userInfo) => this.userInfo.set(userInfo)))
      .subscribe();
  }

  editUserInfo(body: IEditUserInfo) {
    this.httpClient
      .post<IUserInfo>(`${this.userAPI}edit-user-info`, body)
      .pipe(tap((userInfo) => this.userInfo.set(userInfo)))
      .subscribe();
  }
}
