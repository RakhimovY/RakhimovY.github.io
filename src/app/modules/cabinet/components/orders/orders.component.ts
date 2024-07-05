import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { NgClass } from '@angular/common';
import { OrdersTitleComponent } from './components/orders-title/orders-title.component';
import { OrdersFilterComponent } from './components/orders-filter/orders-filter.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonButtonComponent,
    NgClass,
    OrdersTitleComponent,
    OrdersFilterComponent,
    OrdersTableComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {}
