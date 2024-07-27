import { Component, computed } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CabinetService } from '../../../../services/cabinet.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [PaginatorModule, DatePipe],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
})
export class OrdersTableComponent {
  ordersByClient = computed(() => this.cabinetService.ordersByClient());

  constructor(private cabinetService: CabinetService) {}

  onPageChange(event: PaginatorState) {
    this.cabinetService.ordersParams.update((prevValue) => {
      return { ...prevValue, page: event.page ?? 5 };
    });
    document
      .getElementById('ordersByClientTable')
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
