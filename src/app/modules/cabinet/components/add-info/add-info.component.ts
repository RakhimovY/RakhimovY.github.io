import { Component } from '@angular/core';
import { DropdownDirective } from '../../../../shared/directives/dropdown.directive';
import { InputCityComponent } from '../../../../shared/components/input-city/input-city.component';
import { InputEmailComponent } from '../../../../shared/components/input-email/input-email.component';
import { InputFullNameComponent } from '../../../../shared/components/input-full-name/input-full-name.component';
import { InputPasswordComponent } from '../../../../shared/components/input-password/input-password.component';
import { InputPhoneComponent } from '../../../../shared/components/input-phone/input-phone.component';

@Component({
  selector: 'app-add-info',
  standalone: true,
  imports: [
    DropdownDirective,
    InputCityComponent,
    InputEmailComponent,
    InputFullNameComponent,
    InputPasswordComponent,
    InputPhoneComponent,
  ],
  templateUrl: './add-info.component.html',
  styleUrl: './add-info.component.scss',
})
export class AddInfoComponent {}
