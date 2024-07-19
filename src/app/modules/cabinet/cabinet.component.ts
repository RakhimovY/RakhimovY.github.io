import { Component } from '@angular/core';
import { InfoComponent } from './components/info/info.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddInfoComponent } from './components/add-info/add-info.component';
import { BonusesComponent } from './components/bonuses/bonuses.component';

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [InfoComponent, OrdersComponent, AddInfoComponent, BonusesComponent],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss',
})
export class CabinetComponent {}
