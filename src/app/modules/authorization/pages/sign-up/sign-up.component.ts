import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { InputEmailComponent } from '../../components/input-email/input-email.component';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputFullNameComponent } from '../../components/input-full-name/input-full-name.component';
import { InputPhoneComponent } from '../../components/input-phone/input-phone.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonButtonComponent,
    InputEmailComponent,
    InputPasswordComponent,
    TranslateModule,
    InputFullNameComponent,
    InputPhoneComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  phoneFormControl: FormControl = new FormControl('', [Validators.required]);
}
