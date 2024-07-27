import { Component } from '@angular/core';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [DropdownDirective, CommonButtonComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss',
})
export class ManageComponent {}
