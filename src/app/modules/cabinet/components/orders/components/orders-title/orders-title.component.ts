import { Component } from '@angular/core';
import { IOrdersStatusButton } from '../../../../interface/orders.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-orders-title',
  standalone: true,
  imports: [NgClass],
  templateUrl: './orders-title.component.html',
  styleUrl: './orders-title.component.scss',
})
export class OrdersTitleComponent {
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
      sessionStorage.setItem('buttons', JSON.stringify(this.buttons));
      return;
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

    if (
      !this.buttons.filter((item) => {
        return item.active;
      }).length &&
      button.key !== 'all'
    ) {
      this.buttonClick(this.buttons[0]);
    }
    sessionStorage.setItem('buttons', JSON.stringify(this.buttons));
  }
}
