import { Component } from '@angular/core';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { AdminManageService } from './services/admin-manage.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { MainService } from '../../../main/services/main.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [DropdownDirective, CommonButtonComponent, ReactiveFormsModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss',
})
export class ManageComponent {
  weightAmountFormControl: FormControl<number | null> = new FormControl(null);
  chineseAddressFormControl: FormControl<string | null> = new FormControl(null);

  constructor(
    private manageService: AdminManageService,
    private mainService: MainService,
  ) {
    this.manageService.getChineseAddress();
    this.mainService.getWightAmount();

    this.manageService.chineseAddress$
      .pipe(
        tap((value) => {
          if (value) this.chineseAddressFormControl.setValue(value);
        }),
      )
      .subscribe();

    this.mainService.wightAmount$
      .pipe(
        tap((value) => {
          if (value) this.weightAmountFormControl.setValue(value);
        }),
      )
      .subscribe();
  }

  saveChanges() {
    if (this.weightAmountFormControl.value !== null)
      this.manageService.changeWeightAmount(
        this.weightAmountFormControl.value.toString(),
      );
    if (this.chineseAddressFormControl.value !== null)
      this.manageService.changeChineseAddress(
        this.chineseAddressFormControl.value,
      );
  }
}
