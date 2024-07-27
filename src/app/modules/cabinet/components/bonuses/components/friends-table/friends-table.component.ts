import { Component, computed } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CabinetService } from '../../../../services/cabinet.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-friends-table',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './friends-table.component.html',
  styleUrl: './friends-table.component.scss',
})
export class FriendsTableComponent {
  referralFriends = computed(() => this.cabinetService.referralFriends());

  constructor(private cabinetService: CabinetService) {
    this.cabinetService.getReferralFriends(
      new HttpParams().set('page', 0).set('size', 5),
    );
  }

  onPageChange(event: PaginatorState) {
    if (event.page !== undefined) {
      this.cabinetService.getReferralFriends(
        new HttpParams().set('page', event.page).set('size', 5),
      );
      document
        .getElementById('referralFriendsTable')
        ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
}
