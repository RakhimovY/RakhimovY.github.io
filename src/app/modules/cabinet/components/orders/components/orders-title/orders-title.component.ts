import { Component, computed } from '@angular/core';
import { IOrdersStatusButton } from '../../../../interface/orders.interface';
import { CurrencyPipe, NgClass } from '@angular/common';
import { EOrderStatuses } from '../../../../enums/order-statuses.enum';
import { CabinetService } from '../../../../services/cabinet.service';
import { SubscriptionAccumulator } from '../../../../../../core/helpers/SubscriptionAccumulator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-orders-title',
  standalone: true,
  imports: [NgClass, CurrencyPipe],
  templateUrl: './orders-title.component.html',
  styleUrl: './orders-title.component.scss',
})
export class OrdersTitleComponent extends SubscriptionAccumulator {
  buttons: IOrdersStatusButton[] = JSON.parse(
    localStorage.getItem('buttons') as string,
  ) ?? [
    { name: 'Все', key: EOrderStatuses.ALL, active: true },
    { name: 'Зарегистрирован', key: EOrderStatuses.REGISTERED, active: false },
    { name: 'Прибыл', key: EOrderStatuses.ARRIVED, active: false },
    {
      name: 'Выдан',
      key: EOrderStatuses.ISSUED,
      active: false,
    },
  ];

  user = computed(() => this.cabinetService.userInfo());

  constructor(private cabinetService: CabinetService) {
    super();
    this.addSubscriber(
      this.cabinetService.ordersParams$
        .pipe(
          tap((params) => {
            this.cabinetService.getOrdersByClient();
          }),
        )
        .subscribe(),
    );

    this.cabinetService.ordersParams.update((prevValue) => {
      return {
        ...prevValue,
        filter: this.buttons
          .filter((obj) => obj.active && obj.key !== EOrderStatuses.ALL)
          .map((obj) => obj.key)
          .join(','),
      };
    });
  }

  buttonClick(button: IOrdersStatusButton) {
    if (button.key === EOrderStatuses.ALL) {
      this.buttons.forEach((item) => (item.active = false));
      button.active = !button.active;
      localStorage.setItem('buttons', JSON.stringify(this.buttons));
      this.cabinetService.ordersParams.update((prevValue) => {
        return {
          ...prevValue,
          filter: undefined,
        };
      });
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
      !this.buttons.filter((item) => item.active).length &&
      button.key !== EOrderStatuses.ALL
    ) {
      this.buttonClick(this.buttons[0]);
    }

    localStorage.setItem('buttons', JSON.stringify(this.buttons));
    this.cabinetService.ordersParams.update((prevValue) => {
      return {
        ...prevValue,
        filter: this.buttons
          .filter((obj) => obj.active && obj.key !== EOrderStatuses.ALL)
          .map((obj) => obj.key)
          .join(','),
      };
    });
  }
}
