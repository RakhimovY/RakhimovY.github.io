import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-storage-table',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './storage-table.component.html',
  styleUrl: './storage-table.component.scss',
})
export class StorageTableComponent {
  onPageChange(event: PaginatorState) {}
}
