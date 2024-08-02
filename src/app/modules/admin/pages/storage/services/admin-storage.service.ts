import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  IOrders,
  IOrdersParams,
} from '../../../../cabinet/interface/orders.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { ICommonResp } from '../../../../../shared/interfaces/add-Issue-order.interface';

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
  isUploadModalVisible = signal(false);
  isUploadModalVisible$ = toObservable(this.isUploadModalVisible);

  isFileUploaded: WritableSignal<boolean> = signal(false);
  isFileUploaded$ = toObservable(this.isFileUploaded);

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
      )
      .subscribe();
  }

  addTrackNumbers(trackNumbers: string) {
    this.httpClient
      .post<ICommonResp>(this.adminAPI + 'add-track-numbers', null, {
        params: { trackNumbers },
      })
      .pipe(
        tap((resp) => {
          resp.success
            ? (this.toastr.success(resp.text), this.getAllOrders())
            : this.toastr.warning(resp.text);
        }),
      )
      .subscribe();
  }

  issueGoods(trackNumber: string) {
    this.httpClient
      .post<ICommonResp>(this.adminAPI + 'issue-goods', null, {
        params: { trackNumber },
      })
      .pipe(
        tap((resp) => {
          resp.success
            ? (this.toastr.success(resp.text), this.getAllOrders())
            : this.toastr.warning(resp.text);
        }),
      )
      .subscribe();
  }

  deleteTrackNumberByID(orderID: number, trackNumber: string) {
    this.httpClient
      .delete(this.adminAPI + 'delete-track-number-by-id', {
        params: { id: orderID },
      })
      .pipe(
        tap((_) => {
          this.toastr.info(`Заказ №${trackNumber} удален`);
          this.getAllOrders();
        }),
      )
      .subscribe();
  }

  uploadFile(file: FormData) {
    this.httpClient
      .post<ICommonResp>(this.adminAPI + 'upload-file', file)
      .pipe(
        tap((resp: ICommonResp) => {
          this.isFileUploaded.set(true);
          this.isFileUploaded.set(false);
          if (resp.success) {
            this.getAllOrders();
            this.toastr.success(resp.text);
          } else {
            this.toastr.warning(resp.text);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.isFileUploaded.set(true);
          this.isFileUploaded.set(false);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
