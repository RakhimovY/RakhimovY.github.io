import { Component, computed } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { AdminClientsService } from '../../services/admin-clients.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { tap } from 'rxjs';
import { SubscriptionAccumulator } from '../../../../../../core/helpers/SubscriptionAccumulator';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [PaginatorModule, DatePipe, CurrencyPipe],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent extends SubscriptionAccumulator {
  allClients = computed(() => this.adminClientsService.allClients());

  constructor(private adminClientsService: AdminClientsService) {
    super();
    this.addSubscriber(
      this.adminClientsService.clientsParams$
        .pipe(
          tap((params) => {
            this.adminClientsService.getClients();
          }),
        )
        .subscribe(),
    );
  }

  onPageChange(event: PaginatorState) {
    this.adminClientsService.clientsParams.update((prevValue) => {
      return { ...prevValue, page: event.page ?? 5 };
    });
    document
      .getElementById('adminClientTable')
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
