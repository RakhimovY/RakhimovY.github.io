import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { ERouting } from '../../enums/routing.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [TranslateModule, RouterLink, ReactiveFormsModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
})
export class InputPasswordComponent {
  @Input() isSignUp: boolean = false;
  @Input() passwordFormControl!: FormControl;

  passwordHidden: boolean = true;

  protected readonly ERouting = ERouting;

  constructor(private router: Router) {}

  showOrHidePass() {
    const passwordInput: HTMLInputElement | null = document.getElementById(
      'passwordInput',
    ) as HTMLInputElement;
    if (passwordInput?.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
    this.passwordHidden = !this.passwordHidden;
  }

  navToResetPassword() {
    this.router.navigate([ERouting.AUTH, ERouting.PASSWORD_RESET]);
  }
}
