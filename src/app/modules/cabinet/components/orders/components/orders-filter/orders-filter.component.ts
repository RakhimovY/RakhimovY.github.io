import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../../../shared/components/common-button/common-button.component';

@Component({
  selector: 'app-orders-filter',
  standalone: true,
  imports: [CommonButtonComponent],
  templateUrl: './orders-filter.component.html',
  styleUrl: './orders-filter.component.scss',
})
export class OrdersFilterComponent {}
