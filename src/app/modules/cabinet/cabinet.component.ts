import { Component } from '@angular/core';
import { InfoComponent } from './components/info/info.component';
import {OrdersComponent} from "./components/orders/orders.component";

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [InfoComponent, OrdersComponent],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss',
})
export class CabinetComponent {}
