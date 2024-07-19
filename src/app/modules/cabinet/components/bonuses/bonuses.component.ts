import { Component } from '@angular/core';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { CurrencyPipe } from '@angular/common';
import { CopyRefferalLinkComponent } from './components/copy-refferal-link/copy-refferal-link.component';
import { FriendsTableComponent } from './components/friends-table/friends-table.component';

@Component({
  selector: 'app-bonuses',
  standalone: true,
  imports: [
    DropdownDirective,
    CurrencyPipe,
    CopyRefferalLinkComponent,
    FriendsTableComponent,
  ],
  templateUrl: './bonuses.component.html',
  styleUrl: './bonuses.component.scss',
})
export class BonusesComponent {}
