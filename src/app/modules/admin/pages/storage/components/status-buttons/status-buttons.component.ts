import { Component } from '@angular/core';
import { IOrdersStatusButton } from '../../../../../cabinet/interface/orders.interface';
import { NgClass } from '@angular/common';
import { EOrderStatuses } from '../../../../../cabinet/enums/order-statuses.enum';

@Component({
  selector: 'app-status-buttons',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status-buttons.component.html',
  styleUrl: './status-buttons.component.scss',
})
export class StatusButtonsComponent {
  buttons: IOrdersStatusButton[] = JSON.parse(
    localStorage.getItem('buttons') as string,
  ) ?? [
    { name: 'Все', key: EOrderStatuses.ALL, active: true },
    { name: 'Зарегистрирован', key: EOrderStatuses.REGISTERED, active: false },
    { name: 'Прибыл', key: EOrderStatuses.ARRIVED, active: false },
    {
      name: 'Выдан',
      key: EOrderStatuses.ARRIVED,
      active: false,
    },
  ];

  buttonClick(button: IOrdersStatusButton) {
    if (button.key === EOrderStatuses.ALL) {
      this.buttons.forEach((item) => (item.active = false));
      button.active = !button.active;
      localStorage.setItem('buttons', JSON.stringify(this.buttons));
      return;
    } else if (
      this.buttons.filter(
        (item) =>
          item.key !== EOrderStatuses.ALL &&
          !item.active &&
          button.key !== item.key,
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
      button.key !== EOrderStatuses.ALL
    ) {
      this.buttonClick(this.buttons[0]);
    }
    localStorage.setItem('buttons', JSON.stringify(this.buttons));
  }
}
