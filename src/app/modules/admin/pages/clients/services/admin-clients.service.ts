import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IOrdersParams } from '../../../../cabinet/interface/orders.interface';
import { toObservable } from '@angular/core/rxjs-interop';
import { IClients } from '../interfaces/clients.interface';

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
        catchError((error) => {
          this.toastr.error(error.error.massage ?? error.error.error);
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
