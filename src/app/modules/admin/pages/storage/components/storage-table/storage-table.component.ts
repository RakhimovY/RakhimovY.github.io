import { Component, computed } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { AdminStorageService } from '../../services/admin-storage.service';
import { SubscriptionAccumulator } from '../../../../../../core/helpers/SubscriptionAccumulator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-storage-table',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './storage-table.component.html',
  styleUrl: './storage-table.component.scss',
})
export class StorageTableComponent extends SubscriptionAccumulator {
  allOrders = computed(() => this.adminStorageService.allOrders());

  constructor(private adminStorageService: AdminStorageService) {
    super();
    this.addSubscriber(
      this.adminStorageService.allOrdersParams$
        .pipe(
          tap((params) => {
            this.adminStorageService.getAllOrders();
          }),
        )
        .subscribe(),
    );
  }

  onPageChange(event: PaginatorState) {
    this.adminStorageService.allOrdersParams.update((prevValue) => {
      return { ...prevValue, page: event.page ?? 5 };
    });
    document
      .getElementById('ordersByClientTable')
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  onProductDelete(orderID: number) {
    this.adminStorageService.deleteTrackNumberByID(orderID);
  }
}
