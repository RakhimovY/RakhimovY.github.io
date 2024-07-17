import { Component, computed } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { ERouting } from '../../../../shared/enums/routing.enum';
import { InputEmailComponent } from '../../../../shared/components/input-email/input-email.component';
import { InputPasswordComponent } from '../../../../shared/components/input-password/input-password.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ISignIn } from '../../types/auth.interface';
import { AuthorizationController } from '../../controllers/authorization.controller';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonButtonComponent,
    InputEmailComponent,
    TranslateModule,
    InputPasswordComponent,
    RouterLink,
    PaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(4),
    ]),
  });

  isSignLoading = computed(() => this.authorizationController.signLoading());

  constructor(
    private router: Router,
    private authorizationController: AuthorizationController,
  ) {}

  navToSignUp() {
    this.router.navigate([ERouting.AUTH, ERouting.SIGN_UP]);
    window.scrollTo(0, 0);
  }

  signIn() {
    if (this.signInForm.valid) {
      const body: ISignIn = {
        email: this.signInForm.value.emailFormControl,
        password: this.signInForm.value.passwordFormControl,
      };
      this.authorizationController.signIn(body);
    }
  }
}
