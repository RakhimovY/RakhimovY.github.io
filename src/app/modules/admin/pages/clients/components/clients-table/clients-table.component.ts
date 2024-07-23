import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent {
  onPageChange(event: PaginatorState) {}
}
