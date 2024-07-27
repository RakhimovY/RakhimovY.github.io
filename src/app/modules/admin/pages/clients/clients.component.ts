import { Component } from '@angular/core';
import { ClientsFilterComponent } from './components/clients-filter/clients-filter.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientsFilterComponent, ClientsTableComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {}
