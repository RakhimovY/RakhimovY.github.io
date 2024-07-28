import { AfterViewInit, Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ERouting } from '../../../../shared/enums/routing.enum';
import { InputEmailComponent } from '../../../../shared/components/input-email/input-email.component';
import { InputPasswordComponent } from '../../../../shared/components/input-password/input-password.component';
import { InputFullNameComponent } from '../../../../shared/components/input-full-name/input-full-name.component';
import { InputPhoneComponent } from '../../../../shared/components/input-phone/input-phone.component';
import { InputCityComponent } from '../../../../shared/components/input-city/input-city.component';
import { AuthorizationController } from '../../controllers/authorization.controller';
import { ISignUp } from '../../interfaces/auth.interface';
import { IPDropdown } from '../../../../shared/types/pDropdown.interface';

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
    ReactiveFormsModule,
  ],

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements AfterViewInit {
  signUpForm = new FormGroup({
    phoneNumberFormControl: new FormControl('', [Validators.required]),
    cityFormControl: new FormControl<IPDropdown | null>(null, [
      Validators.required,
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    fullNameFormControl: new FormControl('', [Validators.required]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  refferalID!: string;

  constructor(
    private router: Router,
    private authorizationController: AuthorizationController,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.refferalID = this.route.snapshot.queryParams['ref'];
  }

  navToSignIn() {
    this.router.navigate([ERouting.AUTH, ERouting.SIGN_IN]);
    window.scrollTo(0, 0);
  }

  signUp() {
    if (this.signUpForm.valid) {
      const body: ISignUp = {
        city: this.signUpForm.value.cityFormControl?.name,
        email: this.signUpForm.value.emailFormControl,
        fullName: this.signUpForm.value.fullNameFormControl,
        password: this.signUpForm.value.passwordFormControl,
        phoneNumber: this.signUpForm.value.phoneNumberFormControl,
      };
      this.authorizationController.signUp(body, this.refferalID);
    }
  }
}
