import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEditUserInfo, IUserInfo } from '../interface/user.interface';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { IFriends } from '../interface/friends.interface';
import {
  IOrders,
  IOrdersParams,
  IRegisteredTrackNumber,
  IRegisteredTrackNumberReq,
} from '../interface/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class CabinetService {
  userAPI = environment.userAPI;
  productAPI = environment.productAPI;
  userInfo: WritableSignal<IUserInfo | null> = signal(null);
  referralFriends: WritableSignal<IFriends | null> = signal(null);
  ordersByClient: WritableSignal<IOrders | null> = signal(null);
  ordersParams: WritableSignal<IOrdersParams> = signal({
    size: 5,
    page: 0,
  });
  userInfo$ = toObservable(this.userInfo);
  ordersParams$ = toObservable(this.ordersParams);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) {}

  getUserInfo() {
    this.httpClient
      .get<IUserInfo>(`${this.userAPI}user-info`)
      .pipe(tap((userInfo) => this.userInfo.set(userInfo)))
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
      )
      .subscribe();
  }

  getReferralFriends(params: HttpParams) {
    this.httpClient
      .get<IFriends>(`${this.userAPI}get-referral-friends`, { params })
      .pipe(
        tap((referralFriends) => {
          this.referralFriends.set(referralFriends);
        }),
      )
      .subscribe();
  }

  registerTrackNumber(products: IRegisteredTrackNumber[]) {
    this.httpClient
      .post<IRegisteredTrackNumberReq>(
        `${this.productAPI}register-track-number`,
        products,
      )
      .pipe(
        tap((_) => {
          this.getOrdersByClient();
          products.forEach((product) => {
            this.toastr.success(
              product.trackNumber + ': ' + product.productName,
              'Заказ успесно добавлен',
            );
          });
        }),
      )
      .subscribe();
  }

  getOrdersByClient() {
    let params = new HttpParams()
      .set('page', this.ordersParams().page)
      .set('size', this.ordersParams().size);

    const searchByTrack = this.ordersParams().searchByTrack;
    if (searchByTrack) {
      params = params.append('searchByTrack', searchByTrack);
    }
    const filter = this.ordersParams().filter;
    if (filter) {
      params = params.append('filter', filter);
    }

    this.httpClient
      .get<IOrders>(`${this.productAPI}get-track-numbers`, {
        params,
      })
      .pipe(
        tap((ordersByClient) => {
          this.ordersByClient.set(ordersByClient);
        }),
      )
      .subscribe();
  }
}
