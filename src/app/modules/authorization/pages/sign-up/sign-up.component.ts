import {Component} from '@angular/core';
import {CommonButtonComponent} from '../../../../shared/components/common-button/common-button.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormControl, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ERouting} from '../../../../shared/enums/routing.enum';
import {InputEmailComponent} from '../../../../shared/components/input-email/input-email.component';
import {InputPasswordComponent} from '../../../../shared/components/input-password/input-password.component';
import {InputFullNameComponent} from '../../../../shared/components/input-full-name/input-full-name.component';
import {InputPhoneComponent} from '../../../../shared/components/input-phone/input-phone.component';
import {InputCityComponent} from '../../../../shared/components/input-city/input-city.component';

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
    RouterLink,
    InputCityComponent,
  ],

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  phoneFormControl: FormControl = new FormControl('', [Validators.required]);
  protected readonly ERouting = ERouting;

  constructor(private router: Router) {
  }

  navToSignIn() {
    this.router.navigate([ERouting.AUTH, ERouting.SIGN_IN]);
    window.scrollTo(0, 0)

  }
}
