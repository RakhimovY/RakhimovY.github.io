import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AdminManageService {
  adminAPI = environment.adminAPI;
  chineseAddress: WritableSignal<string | null> = signal(null);
  chineseAddress$ = toObservable(this.chineseAddress);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) {}

  getChineseAddress() {
    this.httpClient
      .get(this.adminAPI + 'get-chinese-address', {
        responseType: 'text',
      })
      .pipe(
        tap((address) => {
          this.chineseAddress.set(address);
        }),
      )
      .subscribe();
  }

  changeWeightAmount(amount: string) {
    this.httpClient
      .post(this.adminAPI + 'change-weight-amount', null, {
        params: { amount },
      })
      .pipe(
        tap(() => {
          this.toastr.success('Сумма за кг. изменен');
        }),
      )
      .subscribe();
  }

  changeChineseAddress(text: string) {
    this.httpClient
      .post(this.adminAPI + 'change-chinese-address', null, {
        params: { text },
      })
      .pipe(
        tap(() => {
          this.toastr.success('Адрес склада изменен');
        }),
      )
      .subscribe();
  }
}
