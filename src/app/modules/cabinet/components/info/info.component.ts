import {Component} from '@angular/core';
import {InputFullNameComponent} from '../../../../shared/components/input-full-name/input-full-name.component';
import {InputPhoneComponent} from '../../../../shared/components/input-phone/input-phone.component';
import {InputEmailComponent} from '../../../../shared/components/input-email/input-email.component';
import {InputPasswordComponent} from '../../../../shared/components/input-password/input-password.component';
import {InputCityComponent} from '../../../../shared/components/input-city/input-city.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    InputFullNameComponent,
    InputPhoneComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputCityComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  phoneNumberFormControl: FormControl = new FormControl(null);
}
