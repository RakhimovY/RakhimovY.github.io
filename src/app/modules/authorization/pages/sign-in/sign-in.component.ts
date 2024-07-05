import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { ERouting } from '../../../../shared/enums/routing.enum';
import { InputEmailComponent } from '../../../../shared/components/input-email/input-email.component';
import { InputPasswordComponent } from '../../../../shared/components/input-password/input-password.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonButtonComponent,
    InputEmailComponent,
    TranslateModule,
    InputPasswordComponent,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  protected readonly ERouting = ERouting;

  constructor(private router: Router) {}

  navToSignUp() {
    this.router.navigate([ERouting.AUTH, ERouting.SIGN_UP]);
  }
}
