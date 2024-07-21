import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-friends-table',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './friends-table.component.html',
  styleUrl: './friends-table.component.scss',
})
export class FriendsTableComponent {
  onPageChange(event: PaginatorState) {
    console.log(event);
  }
}
