import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  IOrders,
  IOrdersParams,
} from '../../../../cabinet/interface/orders.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { IAddIssueOrder } from '../interfaces/add-Issue-order.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminStorageService {
  adminAPI = environment.adminAPI;
  allOrders: WritableSignal<IOrders | null> = signal(null);
  allOrdersParams: WritableSignal<IOrdersParams> = signal({
    size: 5,
    page: 0,
  });
  allOrdersParams$ = toObservable(this.allOrdersParams);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) {}

  getAllOrders() {
    let params = new HttpParams()
      .set('page', this.allOrdersParams().page)
      .set('size', this.allOrdersParams().size);

    const searchByTrack = this.allOrdersParams().searchByTrack;
    if (searchByTrack) {
      params = params.append('search', searchByTrack);
    }
    const filter = this.allOrdersParams().filter;
    if (filter) {
      params = params.append('filter', filter);
    }

    this.httpClient
      .get<IOrders>(`${this.adminAPI}get-track-numbers`, {
        params,
      })
      .pipe(
        tap((ordersByClient) => {
          this.allOrders.set(ordersByClient);
        }),
        catchError((error) => {
          this.toastr.error(error.error.massage ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  addTrackNumbers(trackNumbers: string) {
    this.httpClient
      .post<IAddIssueOrder>(this.adminAPI + 'add-track-numbers', null, {
        params: { trackNumbers },
      })
      .pipe(
        tap((resp) => {
          resp.success
            ? (this.toastr.success(resp.text), this.getAllOrders())
            : this.toastr.warning(resp.text);
        }),
        catchError((error) => {
          this.toastr.error(error.error.massage ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  issueGoods(trackNumber: string) {
    this.httpClient
      .post<IAddIssueOrder>(this.adminAPI + 'issue-goods', null, {
        params: { trackNumber },
      })
      .pipe(
        tap((resp) => {
          resp.success
            ? (this.toastr.success(resp.text), this.getAllOrders())
            : this.toastr.warning(resp.text);
        }),
        catchError((error) => {
          this.toastr.error(error.error.massage ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  deleteTrackNumberByID(orderID: number) {
    this.httpClient
      .delete(this.adminAPI + 'delete-track-number-by-id', {
        params: { id: orderID },
      })
      .pipe(
        tap((_) => this.getAllOrders()),
        catchError((error) => {
          this.toastr.error(error.error.massage ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
