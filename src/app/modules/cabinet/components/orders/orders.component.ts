import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { NgClass } from '@angular/common';
import { IOrdersStatusButton } from '../../interface/orders.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonButtonComponent, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  buttons: IOrdersStatusButton[] = JSON.parse(
    sessionStorage.getItem('buttons') as string
  ) ?? [
    { name: 'Все', key: 'all', active: true },
    { name: 'Зарегистрирован', key: 'Registered', active: false },
    { name: 'Прибыл', key: 'Arrived', active: false },
    {
      name: 'Выдан',
      key: 'Issued',
      active: false,
    },
  ];

  buttonClick(button: IOrdersStatusButton) {
    if (button.key === 'all') {
      this.buttons.forEach((item) => (item.active = false));
      button.active = !button.active;
    } else if (
      this.buttons.filter(
        (item) => item.key !== 'all' && !item.active && button.key !== item.key
      ).length
    ) {
      button.active = !button.active;
      this.buttons[0].active = false;
    } else {
      this.buttonClick(this.buttons[0]);
    }

    sessionStorage.setItem('buttons', JSON.stringify(this.buttons));
  }
}
