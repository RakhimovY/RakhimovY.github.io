import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IOrdersParams } from '../../../../cabinet/interface/orders.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { IClient, IClients } from '../interfaces/clients.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminClientsService {
  adminAPI = environment.adminAPI;
  allClients: WritableSignal<IClients | null> = signal(null);
  clientsParams: WritableSignal<IOrdersParams> = signal({
    size: 5,
    page: 0,
  });
  clientsParams$ = toObservable(this.clientsParams);

  client: WritableSignal<IClient | null> = signal(null);
  client$ = toObservable(this.client);

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) {}

  getClients() {
    let params = new HttpParams()
      .set('page', this.clientsParams().page)
      .set('size', this.clientsParams().size);

    const searchByTrack = this.clientsParams().searchByTrack;
    if (searchByTrack) {
      params = params.append('search', searchByTrack);
    }

    this.httpClient
      .get<IClients>(`${this.adminAPI}get-users`, {
        params,
      })
      .pipe(
        tap((allClients) => {
          this.allClients.set(allClients);
        }),
      )
      .subscribe();
  }

  getClientByCode(clientCode: string) {
    this.httpClient
      .get<IClient>(this.adminAPI + 'get-by-client-code', {
        params: { clientCode },
      })
      .pipe(
        tap((client) => {
          this.client.set(client);
        }),
      )
      .subscribe();
  }

  submitClientChanges(amountToPay: number, bonusesToMainClient: number) {
    let params = new HttpParams()
      .set('amountToPay', amountToPay)
      .set('clientId', this.client()?.id as number);
    if (this.client()?.cameFrom) {
      params = params
        .append('bonusesToMainClient', bonusesToMainClient)
        .append('cameFromClientId', this.client()?.cameFrom?.id as number);
    }

    this.httpClient
      .post(this.adminAPI + 'invoice-client', null, {
        params,
        responseType: 'text',
      })
      .pipe(
        tap((resp) => {
          this.toastr.success(resp ?? 'Данные успешно сохранены');
          this.getClients();
        }),
      )
      .subscribe();
  }
}
