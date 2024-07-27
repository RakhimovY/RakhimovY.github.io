import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InputFullNameComponent } from '../../../../shared/components/input-full-name/input-full-name.component';
import { InputPhoneComponent } from '../../../../shared/components/input-phone/input-phone.component';
import { InputEmailComponent } from '../../../../shared/components/input-email/input-email.component';
import { InputPasswordComponent } from '../../../../shared/components/input-password/input-password.component';
import { InputCityComponent } from '../../../../shared/components/input-city/input-city.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { IPDropdown } from '../../../../shared/types/pDropdown.interface';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { CabinetService } from '../../services/cabinet.service';
import { tap } from 'rxjs';
import { cities } from '../../../../core/helpers/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    InputFullNameComponent,
    InputPhoneComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputCityComponent,
    DropdownDirective,
    DropdownDirective,
    ReactiveFormsModule,
    CommonButtonComponent,
    TranslateModule,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit, AfterViewInit {
  infoForm = new FormGroup({
    phoneNumberFormControl: new FormControl('', [Validators.required]),
    cityFormControl: new FormControl<IPDropdown | null>(null, [
      Validators.required,
    ]),
    fullNameFormControl: new FormControl('', [Validators.required]),
  });

  constructor(private cabinetService: CabinetService) {}

  ngAfterViewInit(): void {
    this.cabinetService.userInfo$
      .pipe(
        tap((userInfo) => {
          if (userInfo) {
            this.infoForm.controls.fullNameFormControl.setValue(
              userInfo.fullName,
            );
            this.infoForm.controls.phoneNumberFormControl.setValue(
              userInfo.phoneNumber,
            );
            this.infoForm.controls.cityFormControl.setValue(
              cities.filter((e) => e.name === userInfo.city)[0],
            );
          }
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.infoForm.disable();
    this.cabinetService.getUserInfo();
  }

  saveUserChanges(): void {
    if (this.infoForm.controls.cityFormControl.valid) {
      this.infoForm.disable();
      this.cabinetService.editUserInfo({
        city: this.infoForm.controls.cityFormControl.value?.name,
        fullName: this.infoForm.controls.fullNameFormControl?.value,
        phoneNumber: this.infoForm.controls.phoneNumberFormControl?.value,
      });
    }
  }
}
