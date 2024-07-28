import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  infoAPI = environment.infoAPI;
  wightAmount: WritableSignal<number> = signal(0);

  constructor(private httmClient: HttpClient) {}

  getWightAmount() {
    this.httmClient
      .get(this.infoAPI + 'get-weight-amount', {
        responseType: 'text',
      })
      .pipe(
        tap((wightAmount) => {
          this.wightAmount.set(+wightAmount);
        }),
      )
      .subscribe();
  }
}
